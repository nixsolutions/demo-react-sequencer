export const UPDATE_PLAY = 'UPDATE_PLAY';

const INIT = false;

export default function playReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_PLAY:
            return action.payload;
        default:
            return state;
    }
}

export function updatePlay(playState){
    return {
        type: UPDATE_PLAY,
        payload: playState
    };
}

