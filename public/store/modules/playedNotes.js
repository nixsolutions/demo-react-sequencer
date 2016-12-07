export const ADD_PLAYED_NOTE = 'ADD_PLAYED_NOTE';
export const REMOVE_PLAYED_NOTE = 'REMOVE_PLAYED_NOTE';

const INIT = [];

export default function playedNotesReducer(state = INIT, action){
    switch(action.type){
        case ADD_PLAYED_NOTE:
            return [...state, action.payload];
        case REMOVE_PLAYED_NOTE:
            return state.filter(note => note !== action.payload);
        default:
            return state;
    }
}

export function addPlayedNote(note){
    return {
        type: ADD_PLAYED_NOTE,
        payload: note
    }
}

export function removePlayedNote(note){
    return {
        type: REMOVE_PLAYED_NOTE,
        payload: note
    }
}