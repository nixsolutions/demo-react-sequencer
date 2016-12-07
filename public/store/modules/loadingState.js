export const UPDATE_LOADING_STATE = 'UPDATE_LOADING_STATE';

const INIT = false;

export default function loadingStateReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_LOADING_STATE:
            return action.payload;
        default:
            return state;
    }
}

export function updateLoadingState(value){
    return {
        type: UPDATE_LOADING_STATE,
        payload: value
    }
}