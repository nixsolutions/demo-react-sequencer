export const UPDATE_ACCOMPANIMENT_INSTRUMENT = 'UPDATE_ACCOMPANIMENT_INSTRUMENT';

const INIT = {
    name: '',
    path: null
};

export default function accompanimentInstrumentReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_ACCOMPANIMENT_INSTRUMENT:
            return action.payload;
        default:
            return state;
    }
}

export function updateAccompanimentInstrument(value){
    return {
        type: UPDATE_ACCOMPANIMENT_INSTRUMENT,
        payload: value
    }
}