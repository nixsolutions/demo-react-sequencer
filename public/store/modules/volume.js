
export const UPDATE_VOLUME = 'UPDATE_VOLUME';

const INIT = 70;

export default function volumeReducer(state = INIT, action) {
    switch(action.type) {
        case UPDATE_VOLUME:
            return action.payload;
        default:
            return state;
    }
}

export function updateVolume(value) {
    return {
        type: UPDATE_VOLUME,
        payload: value
    }
}