
export const UPDATE_PIANO_VOLUME = 'UPDATE_PIANO_VOLUME';

const INIT = 70;

export default function pianoVolumeReducer(state = INIT, action) {
    switch(action.type) {
        case UPDATE_PIANO_VOLUME:
            return action.payload;
        default:
            return state;
    }
}

export function updatePianoVolume(value) {
    return {
        type: UPDATE_PIANO_VOLUME,
        payload: value
    }
}