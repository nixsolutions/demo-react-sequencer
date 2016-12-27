export const TOGGLE_INSTRUMENT = 'TOGGLE_INSTRUMENT';
export const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const ADD_INSTRUMENT = 'ADD_INSTRUMENT';

const DEFAULT_INSTRUMENT_VOLUME = 70;

function toggleStepHandler(state, payload){
    let {indexInSequence, instrumentId} = payload;
    let steps = [...state[instrumentId]];
    let step = steps[indexInSequence];
    let toggledStepValue = step === undefined ? 0 : undefined;

    steps.splice(indexInSequence, 1, toggledStepValue);

    return {...state, [instrumentId]: steps};
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

export function toggleStep(indexInSequence, instrumentId){
    return {
        type: TOGGLE_STEP,
        payload: {
            instrumentId,
            indexInSequence
        }
    }
}