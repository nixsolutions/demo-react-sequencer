export const UPDATE_MATRIX = 'UPDATE_MATRIX';

const INIT = [
    {
        active: 1,
        path: './samples/hip-hop_kick.wav',
        notes: [0, 0, undefined, undefined,  undefined, 0, undefined, undefined]
    },
    {
        active: 1,
        path: './samples/hip-hop_snare.wav',
        notes: [undefined, undefined, undefined, 0, undefined, undefined, undefined, 0]
    },
    {
        active: 1,
        path: './samples/techno_hi-hat.wav',
        notes: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
];

export default function matrixReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_MATRIX:
            return action.payload;
        default:
            return state;
    }
}