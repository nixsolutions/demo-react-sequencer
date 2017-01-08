import playKey from './playKey';
// import parallel from './parallel';
// import workers from './workers';
import { fork } from 'redux-saga/effects';

export default function* root() {
    yield fork(playKey);
}
