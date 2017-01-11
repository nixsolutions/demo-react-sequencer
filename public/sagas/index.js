import playKey from './playKey';
import bpm from './bpm';
import sampler from './sampler';
// import parallel from './parallel';
// import workers from './workers';
import { fork } from 'redux-saga/effects';

export default function* root() {
    yield fork(playKey);
    yield fork(bpm);
    yield fork(sampler);
}
