import { take, call, put, fork, cancel, select, race, apply, takeLatest } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'

import { 
    TOGGLE_INSTRUMENT,
    ADD_INSTRUMENT,
    REMOVE_INSTRUMENT,
    UPDATE_INSTRUMENT_VOLUME,
 } from 'modules/instruments';
import { 
    CHANGE_SETTING_INSTRUMENT_EFFECT,
    TOGGLE_MUTE_INSTRUMENT_EFFECT,
    CHANGE_WET_INSTRUMENT_EFFECT,
 } from 'modules/instrumentsEffects';
import { TOGGLE_STEP } from 'modules/instrumentsSteps';
import { UPDATE_PLAY } from 'modules/play';
import { updatePlayedStep } from 'modules/playedStep';
import {updateLoadingState} from 'modules/loadingState';
import {addInstrument} from 'modules/instruments';
import Sampler from 'utils/Sampler';
import { 
    instrumentsSelector, 
    instrumentsStepsSelector, 
    samplesPathsSelector,
    stepsAmountSelector,
    initialSamplesSelector,
    instrumentsEffectsSelector,
} from 'selectors';

const sampler = new Sampler();

function* initSampler(){
    const samplesPaths = yield select(samplesPathsSelector);
    const stepsAmount = yield select(stepsAmountSelector);

    yield apply(sampler, sampler.init, [samplesPaths, stepsAmount]);
}

function* addInitialInstruments(){
    let samples = yield select(initialSamplesSelector);

    for(let i = 0, l = samples.length; i < l; i++){
        yield put(addInstrument(samples[i]));
    }
}

const playedStepUpdatedEvent= eventChannel(emitter => {
    sampler.on('played-step.updated', emitter);

    return () => sampler.off('played-step.updated', emitter);
});

const loadingEvent= eventChannel(emitter => {
    sampler.on('loading', emitter);

    return () => sampler.off('loading', emitter);
});

function* instrumentsAmountWatcher(){
    while(true){
        yield take([ADD_INSTRUMENT, REMOVE_INSTRUMENT]);

        const instruments = yield select(instrumentsSelector);

        yield apply(sampler, sampler.updateSamples, [instruments]);
    }
}

function* instrumentsUpdatesWatcher(){
    while(true){
        yield take([ADD_INSTRUMENT, REMOVE_INSTRUMENT, TOGGLE_STEP, UPDATE_INSTRUMENT_VOLUME]);

        const instruments = yield select(instrumentsSelector);
        const instrumentsSteps = yield select(instrumentsStepsSelector);

        yield apply(sampler, sampler.updateMatrix, [instruments, instrumentsSteps]);
        yield apply(sampler, sampler.updateSequence);
    }
}

function* instrumentsEffectsWatcher(){
    while(true){
        yield take([
            CHANGE_SETTING_INSTRUMENT_EFFECT,
            TOGGLE_MUTE_INSTRUMENT_EFFECT,
            CHANGE_WET_INSTRUMENT_EFFECT
        ]);

        const instrumentsEffects = yield select(instrumentsEffectsSelector);

        yield apply(sampler, sampler.updateInstrumentsEffects, [instrumentsEffects]);
    }
}

function* handlePlay({payload}){
    switch(payload){
        case 'play':
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

function* handleUpdatedStep(value){
    yield put(updatePlayedStep(value));
}

function* handleLoading(value){
    yield put(updateLoadingState(value));
}

export default function* samplerSaga(){
    yield call(initSampler);

    yield takeLatest(playedStepUpdatedEvent, handleUpdatedStep);
    yield takeLatest(loadingEvent, handleLoading);

    yield takeLatest(UPDATE_PLAY, handlePlay);

    yield fork(instrumentsAmountWatcher);
    yield fork(instrumentsUpdatesWatcher);
    yield fork(instrumentsEffectsWatcher);

    yield call(addInitialInstruments);
}