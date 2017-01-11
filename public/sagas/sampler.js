import { take, call, put, fork, cancel, select, race, apply, takeLatest } from 'redux-saga/effects';
import { 
    TOGGLE_INSTRUMENT,
    ADD_INSTRUMENT,
    REMOVE_INSTRUMENT,
    UPDATE_INSTRUMENT_VOLUME,
 } from 'modules/instruments';
import { TOGGLE_STEP } from 'modules/instrumentsSteps';
import { UPDATE_PLAY } from 'modules/play';
import {updatePlayedStep} from 'modules/playedStep';
import {updateLoadingState} from 'modules/loadingState';
import Sampler from 'utils/Sampler';
import { instrumentsSelector, instrumentsStepsSelector, samplesPathsSelector } from 'selectors';

const sampler = new Sampler();

function* initSampler(){
    const samplesPaths = yield select(samplesPathsSelector);
    yield apply(sampler, sampler.init, samplesPaths);
}

function* instrumentsAmountWatcher(){
    while(true){
        yield take([ADD_INSTRUMENT, REMOVE_INSTRUMENT]);

        const instruments = yield select(instrumentsSelector);

        yield apply(sampler, sampler.updateSamples, [instruments]);
    }
}

function* instrumentsUpdatesWatcher(){
    while(true){
        yield take([ADD_INSTRUMENT, REMOVE_INSTRUMENT, TOGGLE_STEP]);

        const instruments = yield select(instrumentsSelector);
        const instrumentsSteps = yield select(instrumentsStepsSelector);

        yield apply(sampler, sampler.updateMatrix, [instruments, instrumentsSteps]);
        yield apply(sampler, sampler.updateSequence);
    }
}

function* handlePlay({payload}){
    switch(payload){
        case 'play':
        debugger
            yield apply(sampler, sampler.play);
            break;
        case 'pause':
            yield apply(sampler, sampler.pause);
            break;
        case 'stop':
            yield apply(sampler, sampler.stop);
            yield put(updatePlayedStep(-1));
            break;
    }
}

export default function* samplerSaga(){
    yield call(initSampler);

    yield takeLatest(UPDATE_PLAY, handlePlay);

    yield fork(instrumentsAmountWatcher);
    yield fork(instrumentsUpdatesWatcher);
}