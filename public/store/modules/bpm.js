export const UPDATE_BPM = 'UPDATE_BPM';

const INIT = 120;

export function bpm(state = INIT, action){
    switch(action.type){
        case UPDATE_BPM:
            return action.payload;
        default:
            return state;
    }
}