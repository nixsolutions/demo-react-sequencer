export const UPDATE_BPM = 'UPDATE_BPM';

const INIT = 90;

export default function bpmReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_BPM:
            return action.payload;
        default:
            return state;
    }
}

export function updateBPM(value){
    return {
        type: UPDATE_BPM,
        payload: value
    }
}