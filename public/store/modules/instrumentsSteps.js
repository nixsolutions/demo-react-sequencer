export const TOGGLE_INSTRUMENT = 'TOGGLE_INSTRUMENT';
export const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const ADD_INSTRUMENT = 'ADD_INSTRUMENT';

const DEFAULT_INSTRUMENT_VOLUME = 70;

function toggleStepHandler(state, payload){
    let {noteIndex, noteValue, id} = payload;
    let notes = [...state[id]];

    notes.splice(noteIndex, 1, noteValue);

    return {...state, [id]: notes};
}

function addInstrumentHandler(state, payload){
    let {id, stepsAmount} = payload;

    return {...state, [id]: createDefaultSteps(stepsAmount)};
}

function removeInstrumentHandler(state, payload){
    let copy = {...state};
    delete copy[payload];

    return copy;
}

export default function instrumentsStepsReducer(state = {}, action){
    let {payload} = action;

    switch(action.type){
        case TOGGLE_STEP:
            return toggleStepHandler(state, payload);

        case ADD_INSTRUMENT:
            return addInstrumentHandler(state, payload);

        case REMOVE_INSTRUMENT:
            return removeInstrumentHandler(state, payload);

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
            name: instrument.name,
            noteValue: note === undefined ? 0 : undefined,
            noteIndex
        }
    }
}