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
    },
    {
        name: 'afro latin bell',
        path: './samples/afro-latin_bell.wav'
    },
    {
        name: 'afro latin bongo',
        path: './samples/afro-latin_bongo_high.wav'
    },
    {
        name: 'afro latin conga low',
        path: './samples/afro-latin_conga_low.wav'
    },
    {
        name: 'bells',
        path: './samples/bells.wav'
    },
    {
        name: 'piano',
        path: './samples/piano.wav'
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