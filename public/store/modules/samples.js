export const ADD_SAMPLES = 'ADD_SAMPLES';

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

export default function samplesReducer(state = INIT, action){
    switch(action.type){
        case ADD_SAMPLES:
            return [...state, ...action.payload];
        default:
            return state;
    }
}

export function addSamples(value){
    return {
        type: ADD_SAMPLES,
        payload: value
    }
}