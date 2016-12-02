export const UPDATE_ANALYSER = 'UPDATE_ANALYSER';

const INIT = null;

export default function analyserReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_ANALYSER:
            return action.payload;
        default:
            return state;
    }
}

export function updateAnalyser(value){
    return {
        type: UPDATE_ANALYSER,
        payload: value
    }
}