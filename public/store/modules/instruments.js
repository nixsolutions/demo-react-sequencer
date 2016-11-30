export const UPDATE_INSTRUMENTS = 'UPDATE_INSTRUMENTS';

const INIT = [
    {
        active: true,
        path: './samples/hip-hop_kick.wav',
        notes: [0, 0, undefined, undefined,  undefined, 0, undefined, undefined]
    },
    {
        active: true,
        path: './samples/hip-hop_snare.wav',
        notes: [undefined, undefined, undefined, 0, undefined, undefined, undefined, 0]
    },
    {
        active: true,
        path: './samples/techno_hi-hat.wav',
        notes: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
];

export default function instrumentsReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_INSTRUMENTS:
            return action.payload;
        default:
            return state;
    }
}