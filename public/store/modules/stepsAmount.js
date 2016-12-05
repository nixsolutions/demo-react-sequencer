
export const UPDATE_STEPS_AMOUNT = 'UPDATE_STEPS_AMOUNT';

const INIT = 16;

export default function stepsAmountReducer(state = INIT, action) {
    switch(action.type) {
        case UPDATE_STEPS_AMOUNT:
            return action.payload;
        default:
            return state;
    }
}

export function updateStepsAmount(value) {
    return {
        type: UPDATE_STEPS_AMOUNT,
        payload: value
    }
}