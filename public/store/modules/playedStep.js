export const UPDATE_PLAYED_STEP = 'UPDATE_PLAYED_STEP';

const INIT = -1;

export default function playedStepReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_PLAYED_STEP:
            return action.payload;
        default:
            return state;
    }
}

export function updatePlayedStep(value){
    return {
        type: UPDATE_PLAYED_STEP,
        payload: value
    }
}