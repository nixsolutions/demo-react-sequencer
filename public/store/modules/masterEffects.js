export const ADD_MASTER_EFFECT = 'ADD_MASTER_EFFECT';
export const REMOVE_MASTER_EFFECT = 'REMOVE_MASTER_EFFECT';
export const CHANGE_WET_MASTER_EFFECT = 'CHANGE_WET_MASTER_EFFECT';
export const CHANGE_SETTING_MASTER_EFFECT = 'CHANGE_SETTING_MASTER_EFFECT';
export const TOGGLE_MUTE_MASTER_EFFECT = 'TOGGLE_MUTE_MASTER_EFFECT';

export const REVERBERATOR = 'REVERBERATOR';
export const DELAY = 'DELAY';
export const FILTER = 'FILTER';

export const RANGE_SETTING_TYPE = 'RANGE';
export const TIME_SETTING_TYPE = 'RANGE';


const INIT = [];

let getReverberatorDefaults = () => ({
    id: Date.now(),
    type: REVERBERATOR,
    label: 'reverb',
    wet: 50,
    active: true,
    settings: {
        roomSize: {
            label: 'room size', 
            value: 30,
            type: RANGE_SETTING_TYPE
        }
    }
});

let getDelayDefaults = () => ({
    id: Date.now(),
    type: DELAY,
    label: 'delay',
    wet: 50,
    active: true,
    settings: {
        delayTime: {
            label: 'Delay Time', 
            value: 30,
            type: RANGE_SETTING_TYPE
        },
        feedback: {
            label: 'feedback', 
            value: 30,
            type: RANGE_SETTING_TYPE
        }
    }
});

let getFilterDefaults = () => ({
    id: Date.now(),
    type: FILTER,
    label: 'filter',
    wet: 50,
    active: true,
    settings: {
        roomSize: {
            label: 'room size', 
            value: 30
        }
    }
});

export let getEffect = (effectType) => {
    switch(effectType){
        case REVERBERATOR:
            return getReverberatorDefaults();
        case DELAY:
            return getDelayDefaults();
        case FILTER:
            return getFilterDefaults();
    }
}

export default function masterEffectsReducer(state = INIT, action){
    let {payload} = action;

    switch(action.type){
        case ADD_MASTER_EFFECT:
            return [...state, getEffect(payload)];

        case REMOVE_MASTER_EFFECT:
            return state.filter(effect => effect.id !== payload);

        case CHANGE_WET_MASTER_EFFECT:
            return state.map(effect => {
                if(effect.id !== payload.id){ return effect; }

                return {...effect, wet: payload.value};
            });

        case TOGGLE_MUTE_MASTER_EFFECT:
            return state.map(effect => {
                if(effect.id !== payload.id){ return effect; }

                return {...effect, active: !effect.active};
            });

        case CHANGE_SETTING_MASTER_EFFECT:
            return state.map(effect => {
                if(effect.id !== payload.id){ return effect; }

                let settings = {...effect.settings};

                settings[payload.type] = {...settings[payload.type], value: payload.value}
                return {...effect, settings};
            });
    
        default:
            return state;
    }
}

export function addMasterEffect(value){
    return {
        type: ADD_MASTER_EFFECT,
        payload: value
    }
}

export function removeMasterEffect(value){
    return {
        type: REMOVE_MASTER_EFFECT,
        payload: value
    }
}

export function changeWetMasterEffect(percents, effectId){
    return {
        type: CHANGE_WET_MASTER_EFFECT,
        payload: {
            id: effectId,
            value: percents
        }
    }
}

export function toggleMuteMasterEffect(effectId){
    return {
        type: TOGGLE_MUTE_MASTER_EFFECT,
        payload: {id: effectId}
    }
}

export function changeSettingMasterEffect(setting, percents, effectId){
    return {
        type: CHANGE_SETTING_MASTER_EFFECT,
        payload: {
            id: effectId,
            type: setting,
            value: percents
        }
    }
}