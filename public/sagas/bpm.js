import Tone from 'tone';
import { take, call, put, fork, cancel, select, race } from 'redux-saga/effects';
import { UPDATE_BPM, updateBPM } from 'modules/bpm';

function updateBpmValue(value){
    Tone.Transport.bpm.value = value || 1;
}

export default function* bpm(){
    while(true){
        const { payload } = yield take(UPDATE_BPM);

        yield call(updateBpmValue, payload);
    }
}