export const UPDATE_MATRIX = 'UPDATE_MATRIX';

const INIT = [
    {active: 1},
    {active: 1},
    {active: 2},
    {active: 3},
];

export default function matrixReducer(state = INIT, action){
    switch(action.type){
        case UPDATE_MATRIX:
            return action.payload;
        default:
            return state;
    }
}