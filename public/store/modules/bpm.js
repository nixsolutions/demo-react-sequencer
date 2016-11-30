export const UPDATE_BPM = 'UPDATE_BPM';

const INIT = 120;

export default function bpmReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_BPM:
            return action.payload;
        default:
            return state;
    }
}