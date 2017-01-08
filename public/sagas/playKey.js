import { take, call, put, fork, cancel, select, race } from 'redux-saga/effects';
import { ADD_PLAYED_NOTE } from 'modules/playedNotes';
import { UPDATE_ACCOMPANIMENT_INSTRUMENT, updateAccompanimentInstrument } from 'modules/accompanimentInstrument';
import { noteToPitch, percentsToDecibels} from 'utils/notes';
import { pianoVolume, samples } from 'selectors';
import Tone from 'tone';

const buffer = new Tone.Buffer();

const playNote = (sample, note, volume) => {
    const pitch = noteToPitch(note);

    sample.volume.value = percentsToDecibels(volume);
    sample.triggerAttackRelease(pitch);
};

function* initSample(){
    const samplesSet = yield select(samples);
    yield put(updateAccompanimentInstrument(samplesSet[0]))
}

function* loadSample(path){
    return yield new Promise((resolve, reject) => {
        buffer.load(path, (buffer) => {
            const sample = new Tone.Sampler(buffer).toMaster();
            resolve(sample);
        }, reject);
    });
}

function* sampleManager(){
    const { payload } = yield take(UPDATE_ACCOMPANIMENT_INSTRUMENT);

    return yield loadSample(payload.path);
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
        const sample = yield call(sampleManager);

        if(playKeyTask){
            yield cancel(playKeyTask);
        }

        playKeyTask = yield fork(playKey, sample);
    }
}

