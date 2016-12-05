export const ADD_INSTRUMENTS_TO_SET = 'ADD_INSTRUMENTS_TO_SET';

const INIT = [
    {
        name: 'kick',
        path: './samples/hip-hop_kick.wav'
    },
    {
        name: 'hip-hop_snare',
        path: './samples/hip-hop_snare.wav'
    },
    {
        name: 'hi-hat',
        path: './samples/techno_hi-hat.wav'
    }
];

export default function instrumentsSetReducer(state = INIT, action){
    switch(action.type){
        case ADD_INSTRUMENTS_TO_SET:
            return [...state, ...action.payload];
        default:
            return state;
    }
}

export function addInstrumentsToSet(value){
    return {
        type: ADD_INSTRUMENTS_TO_SET,
        payload: value
    }
}