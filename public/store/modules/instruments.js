import {combineReducers} from 'redux';
import {generateId} from 'utils/helper';

export const TOGGLE_INSTRUMENT = 'TOGGLE_INSTRUMENT';
export const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const UPDATE_INSTRUMENT_VOLUME = 'UPDATE_INSTRUMENT_VOLUME';
export const ADD_INSTRUMENT = 'ADD_INSTRUMENT';

const DEFAULT_INSTRUMENT_VOLUME = 70;

function toggleStepHandler(state, payload){
    return state.map(instrument => {
        if(instrument.name === payload.name){
            let notes = [...instrument.notes];

            notes[payload.noteIndex] = payload.noteValue;

            return {...instrument, notes};
        }

        return instrument;
    });
}

function addInstrumentHandler(state, payload){
    let newInstrument = {
        id: payload.id,
        name: payload.name,
        path: payload.path,
        notes: createDefaultSteps(payload.stepsAmount),
        active: true,
        volume: DEFAULT_INSTRUMENT_VOLUME
    }
    return {
        ...state, 
        [payload.id]: newInstrument
    };
}

function toggleInstrumentHandler(state, payload){
    let instrument = {...state[payload]};
    instrument.active = !instrument.active;

    return {...state, [payload]: instrument};
}

function updateInstrumentVolumeHandler(state, payload){
    let {instrumentId, volume} = payload;
    let instrument = {...state[instrumentId], volume};

    return {...state, [instrumentId]: instrument};
}

function removeInstrumentHandler(state, payload){
    let copy = {...state};
    delete copy[payload];

    return copy;
}

export default combineReducers({
    byId,
    allIds
})

function byId(state = {}, action){
    let {payload} = action;

    switch(action.type){
        case TOGGLE_STEP:
            return toggleStepHandler(state, payload);

        case ADD_INSTRUMENT:
            return addInstrumentHandler(state, payload);

        case TOGGLE_INSTRUMENT:
            return toggleInstrumentHandler(state, payload);

        case UPDATE_INSTRUMENT_VOLUME:
            return updateInstrumentVolumeHandler(state, payload);

        case REMOVE_INSTRUMENT:
            return removeInstrumentHandler(state, payload);

        default:
            return state;
    }
}

function allIds(state = [], action){
    let {payload} = action;

    switch(action.type){
        case ADD_INSTRUMENT:
            return [...state, payload.id];

        case REMOVE_INSTRUMENT:
            return state.filter(id => id !== payload);

        default:
            return state;
    }
}

function createDefaultSteps(stepsAmount){
    let steps = [];
    for(let i = 0; i < stepsAmount; i++, steps.push(undefined));
    return steps;
}

function checkIfInstrumentWithNameExists(instrumentName, instruments){
    let keys = Object.keys(instruments);
    return keys.some(key => instruments[key].name === instrumentName);
}

function modifyInstrumentName(instrumentName, index){
    return `${instrumentName}${index}`;
}

function defineInstrumentName(initialInstrumentName, instruments){
    if(!checkIfInstrumentWithNameExists(initialInstrumentName, instruments)){
        return initialInstrumentName;
    }

    let i = 1;
    let instrumentName = initialInstrumentName;

    while(checkIfInstrumentWithNameExists(instrumentName, instruments)){
        instrumentName = modifyInstrumentName(initialInstrumentName, i);
        i++;
    }

    return instrumentName;
}

export function toggleStep(note, noteIndex, instrument){
    return {
        type: TOGGLE_STEP,
        payload: {
            name: instrument.name,
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
        let {stepsAmount, instruments} = getState();

        dispatch({
            type: ADD_INSTRUMENT,
            payload: {
                ...instrument,
                id: generateId(),
                stepsAmount, 
                name: defineInstrumentName(instrument.name, instruments)
            }
        });
    }
}

export function updateInstrumentVolume(instrumentId, volumePercents){
    return {
        type: UPDATE_INSTRUMENT_VOLUME,
        payload: {
            instrumentId,
            volume: volumePercents
        }
    }
}