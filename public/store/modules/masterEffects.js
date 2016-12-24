export const CHANGE_WET_MASTER_EFFECT = 'CHANGE_WET_MASTER_EFFECT';
export const CHANGE_SETTING_MASTER_EFFECT = 'CHANGE_SETTING_MASTER_EFFECT';
export const TOGGLE_MUTE_MASTER_EFFECT = 'TOGGLE_MUTE_MASTER_EFFECT';

import {getEffectsSet} from 'utils/effects';

const INIT = getEffectsSet();

let changeWet = (state, payload) => {
    return state.map(effect => {
        if(effect.id !== payload.id){ return effect; }

        return {...effect, wet: payload.value};
    });
};

let toggleMute = (state, payload) => {
    return state.map(effect => {
        if(effect.id !== payload.id){ return effect; }

        return {...effect, active: !effect.active};
    });
};

let changeSetting = (state, payload) => {
    return state.map(effect => {
        if(effect.id !== payload.id){ return effect; }

        let settings = {...effect.settings};

        settings[payload.type] = {...settings[payload.type], value: payload.value};
        return {...effect, settings};
    });
};

export default function masterEffectsReducer(state = INIT, action){
    let {type, payload} = action;

    switch(type){
        case CHANGE_WET_MASTER_EFFECT:
            return changeWet(state, payload);

        case TOGGLE_MUTE_MASTER_EFFECT:
            return toggleMute(state, payload);

        case CHANGE_SETTING_MASTER_EFFECT:
            return changeSetting(state, payload);

        default:
            return state;
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