import {
    ADD_INSTRUMENT,
    REMOVE_INSTRUMENT
} from './instruments';

export const ADD_INSTRUMENT_EFFECT = 'ADD_INSTRUMENT_EFFECT';
export const REMOVE_INSTRUMENT_EFFECT = 'REMOVE_INSTRUMENT_EFFECT';
export const TOGGLE_MUTE_INSTRUMENT_EFFECT = 'TOGGLE_MUTE_INSTRUMENT_EFFECT';
export const CHANGE_WET_INSTRUMENT_EFFECT = 'CHANGE_WET_INSTRUMENT_EFFECT';
export const CHANGE_SETTING_INSTRUMENT_EFFECT = 'CHANGE_SETTING_INSTRUMENT_EFFECT';

const INIT = {};

export default function instrumentsEffectsReducer(state = INIT, action){
    let {getEffect, getEffectsSet} = require('utils/effects');

    switch(action.type){
        case ADD_INSTRUMENT_EFFECT:
            var {instrumentName, effect} = action.payload;
            var clone = {...state};
            var effects = clone[instrumentName] || [];
            clone[instrumentName] = [...effects, getEffect(effect)];

            return clone;

        case REMOVE_INSTRUMENT_EFFECT:
            var {instrumentName, effectId} = action.payload;
            var clone = {...state};
            var effects = [...clone[instrumentName]];

            clone[instrumentName] = effects.filter(effect => effect.id !== effectId);
            return clone;

        case TOGGLE_MUTE_INSTRUMENT_EFFECT:
            var {instrumentName, effectId} = action.payload;
            var clone = {...state};
            var effects = [...clone[instrumentName]];
            clone[instrumentName] = effects.map(effect => {
                if(effect.id === effectId){
                    return {...effect, active: !effect.active};
                }

                return effect;
            });

            return clone;
    
        case CHANGE_WET_INSTRUMENT_EFFECT:
            var {effectId, value, instrumentName} = action.payload;
            var clone = {...state};
            var effects = [...clone[instrumentName]];
            clone[instrumentName] = effects.map(effect => {
                if(effect.id === effectId){
                    return {...effect, wet: value};
                }

                return effect;
            });

            return clone;

        case CHANGE_SETTING_INSTRUMENT_EFFECT:
            var {effectId, type, value, instrumentName} = action.payload;
            var clone = {...state};
            var effects = [...clone[instrumentName]];
            clone[instrumentName] = effects.map(effect => {
                if(effect.id === effectId){
                    let settings = {...effect.settings};

                    settings[type].value = value;

                    return {...effect, settings};
                }

                return effect;
            });

            return clone;

        case ADD_INSTRUMENT:
            var {name} = action.payload;
            var clone = {...state};
            clone[name] = getEffectsSet();

            return clone;

        case REMOVE_INSTRUMENT:
            var {name} = action.payload;
            var clone = {...state};
            delete clone[name];

            return clone;

        default:
            return state;
    }
}

export function addInstrumentEffect(effect, instrumentName){
    return {
        type: ADD_INSTRUMENT_EFFECT,
        payload: {effect, instrumentName}
    }
}

export function removeInstrumentEffect(effectId, instrumentName){
    return {
        type: REMOVE_INSTRUMENT_EFFECT,
        payload: {effectId, instrumentName}
    }
}

export function toggleMuteInstrumentEffect(effectId, instrumentName){
    return {
        type: TOGGLE_MUTE_INSTRUMENT_EFFECT,
        payload: {effectId, instrumentName}
    }
}

export function changeWetInstrumentEffect(effectId, value, instrumentName){
    return {
        type: CHANGE_WET_INSTRUMENT_EFFECT,
        payload: {effectId, value, instrumentName}
    }
}

export function changeSettingInstrumentEffect(effectId, type, value, instrumentName){
    return {
        type: CHANGE_SETTING_INSTRUMENT_EFFECT,
        payload: {effectId, type, value, instrumentName}
    }
}