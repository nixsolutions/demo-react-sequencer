export const BIND_TO_KEY = 'BIND_TO_KEY';

const INIT = {};

export default function bindingsReducer(state = INIT, action){
    let {payload} = action;

    switch(action.type){
        case BIND_TO_KEY:
            let clone = Object.assign({}, state);
            clone[payload.keyCode] = {down: payload.down, up: payload.up};

            return clone;
        default:
            return state;
    }
}

export function bindToKey(value){
    return {
        type: BIND_TO_KEY,
        payload: value
    }
}