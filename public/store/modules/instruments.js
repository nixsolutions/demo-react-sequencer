export const UPDATE_INSTRUMENTS = 'UPDATE_INSTRUMENTS';
export const TOGGLE_INSTRUMENT = 'TOGGLE_INSTRUMENT';
export const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const UPDATE_INSTRUMENT_VOLUME = 'UPDATE_INSTRUMENT_VOLUME';
export const ADD_INSTRUMENT = 'ADD_INSTRUMENT';

const DEFAULT_INSTRUMENT_VOLUME = 70;
const INIT = [];

export default function instrumentsReducer(state = INIT, action){
    let {payload} = action;

    switch(action.type){
        case UPDATE_INSTRUMENTS:
            return payload;
        case TOGGLE_STEP:
            return state.map(instrument => {
                if(instrument.path === payload.path){
                    let notes = [...instrument.notes];

                    notes[payload.noteIndex] = payload.noteValue;
    
                    return {...instrument, notes};
                }

                return instrument;
            });
        case ADD_INSTRUMENT:
            let newInstrument = {
                name: payload.name,
                path: payload.path,
                notes: createDefaultSteps(payload.stepsAmount),
                active: true,
                volume: DEFAULT_INSTRUMENT_VOLUME
            }
            return [...state, newInstrument];
        case TOGGLE_INSTRUMENT:
            return state.map(instrument => {
                if(instrument === payload){
                    return {...instrument, active: !instrument.active};
                }

                return instrument;
            });
        case UPDATE_INSTRUMENT_VOLUME:
            return state.map(instrument => {
                if(instrument === payload.instrument){
                    return {...instrument, volume: payload.volume};
                }

                return instrument;
            });
        case REMOVE_INSTRUMENT:
            return state.filter(instrument => instrument !== payload);
        default:
            return state;
    }
}

function createDefaultSteps(stepsAmount){
    let steps = [];
    for(let i = 0; i < stepsAmount; i++, steps.push(undefined));
    return steps;
}

export function toggleStep(note, noteIndex, instrument){
    return {
        type: TOGGLE_STEP,
        payload: {
            path: instrument.path,
            noteValue: note === undefined ? 0 : undefined,
            noteIndex
        }
    }
}

export function toggleInstrument(instrument){
    return {
        type: TOGGLE_INSTRUMENT,
        payload: instrument
    }
}

export function removeInstrument(instrument){
    return {
        type: REMOVE_INSTRUMENT,
        payload: instrument
    }
}

export function addInstrument(instrument){
    return function(dispatch, getState){
        let {stepsAmount} = getState();

        dispatch({
            type: ADD_INSTRUMENT,
            payload: {...instrument, stepsAmount}
        });
    }
}

export function updateInstrumentVolume(instrument, volumePercents){
    return {
        type: UPDATE_INSTRUMENT_VOLUME,
        payload: {
            instrument,
            volume: volumePercents
        }
    }
}