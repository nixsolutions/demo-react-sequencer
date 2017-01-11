import { take, call, put, fork, cancel, select, race } from 'redux-saga/effects';
import { ADD_PLAYED_NOTE } from 'modules/playedNotes';
import { updateLoadingState } from 'modules/loadingState';
import { UPDATE_ACCOMPANIMENT_INSTRUMENT, updateAccompanimentInstrument } from 'modules/accompanimentInstrument';
import { noteToPitch, percentsToDecibels} from 'utils/notes';
import { pianoVolume, samples } from 'selectors';
import Samples from 'utils/samples';

const samplesManager = new Samples();

const playNote = (sample, note, volume) => {
    const pitch = noteToPitch(note);

    sample.volume.value = percentsToDecibels(volume);
    sample.triggerAttackRelease(pitch);
};

function* initSample(){
    const samplesSet = yield select(samples);
    yield put(updateAccompanimentInstrument(samplesSet[0]))
}

function* instrumentUpdater(){
    const { payload } = yield take(UPDATE_ACCOMPANIMENT_INSTRUMENT);
    let sample;

    yield put(updateLoadingState(true));

    try {
        sample = yield samplesManager.loadSample(payload.path);
    } catch (e) {
        console.error('Can\'t load the sample');
    } finally {
        yield put(updateLoadingState(false));
    }

    return sample;
}

function* playKey(sample) {
    while (true) {
        const { payload } = yield take(ADD_PLAYED_NOTE);
        const volume = yield select(pianoVolume);

        yield fork(playNote, sample, payload, volume);
    }
}

export default function* playKeyWatch(){
    yield fork(initSample);

    let playKeyTask;

    while(true){
        const sample = yield call(instrumentUpdater);

        if(!sample){ continue; }

        if(playKeyTask){
            yield cancel(playKeyTask);
        }

        playKeyTask = yield fork(playKey, sample);
    }
}

