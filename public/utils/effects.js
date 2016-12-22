import Tone from 'tone';

import {mapObject, copyDeepObject} from 'utils/helper';

export const REVERBERATOR = 'REVERBERATOR';
export const PING_PONG_DELAY = 'PING_PONG_DELAY';
export const FEEDBACK_DELAY = 'FEEDBACK_DELAY';
export const CHORUS = 'CHORUS';

export const RANGE_SETTING_TYPE = 'RANGE';
export const FREQUENCY_SETTING_TYPE = 'FREQUENCY_SETTING_TYPE';

let generateId = () => Math.random();

let getReverberatorDefaults = () => ({
    id: generateId(),
    type: REVERBERATOR,
    label: 'reverberator',
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

let getPingPongDelayDefaults = () => ({
    id: generateId(),
    type: PING_PONG_DELAY,
    label: 'ping-pong delay',
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

let getFeedbackDelayDefaults = () => ({
    id: generateId(),
    type: FEEDBACK_DELAY,
    label: 'feedback delay',
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

let getChorusDefaults = () => ({
    id: generateId(),
    type: CHORUS,
    label: 'chorus',
    wet: 50,
    active: true,
    settings: {
        frequency: {
            label: 'frequency', 
            value: 30,
            type: FREQUENCY_SETTING_TYPE
        },
        delayTime: {
            label: 'Delay Time', 
            value: 30,
            type: RANGE_SETTING_TYPE
        },
        depth: {
            label: 'depth', 
            value: 30,
            type: RANGE_SETTING_TYPE
        }
    }
});

export let effects = [
    getReverberatorDefaults(),
    getPingPongDelayDefaults(),
    getFeedbackDelayDefaults(),
    getChorusDefaults()
]

export let getEffectsSet = () => {
    return [
        getEffect(REVERBERATOR),
        getEffect(PING_PONG_DELAY),
        getEffect(FEEDBACK_DELAY),
        getEffect(CHORUS)
    ];
}

export let getEffect = (effectType) => {
    let result;

    effects.forEach(effect => {
        if(effect.type === effectType){
            result = copyDeepObject(effect);
        }
    })
    result.id = generateId();

    return result;
}

export let getEffectsList = () => {
    return getEffectsSet().map(effect => ({title: effect.label, value: effect.type}));
};

export let getSettingValue = (setting, type) => {
    if(typeof type === 'string'){
        setting = {
            value: setting,
            type
        }
    }

    switch(setting.type){
        case RANGE_SETTING_TYPE:
            return setting.value / 100;
        case FREQUENCY_SETTING_TYPE:
            let range = 10000 - 20;
            let percentValue = range / 100;

            return percentValue * setting.value;
        default:
            return setting.value;
    }
}


export let createEffect = (effectOptions, isMasterEffect) => {
    let {settings} = effectOptions;
    let effectInstance;

    switch(effectOptions.type){
        case REVERBERATOR:
            effectInstance = new Tone.JCReverb();
            break;
        case PING_PONG_DELAY:
            effectInstance = new Tone.PingPongDelay();
            break;
        case FEEDBACK_DELAY:
            effectInstance = new Tone.FeedbackDelay();
            break;
        case CHORUS:
            effectInstance = new Tone.Chorus();
            break;
    }

    applySettingsToEffect(effectOptions, effectInstance, isMasterEffect);
    return effectInstance;
}

export let applySettingsToEffect = (effectOptions, effect, isMasterEffect) => {
    let {settings} = effectOptions;

    mapObject(settings, (settingName, settingOptions) => {
        let value = getSettingValue(settingOptions);

        if(effect[settingName].value !== undefined){
            effect[settingName].value = value;
        }else{
            effect[settingName] = value ;
        }
        
    });

    let wetValue = effectOptions.active ? (effectOptions.wet / 100) : 0;

    if(isMasterEffect){
        effect.wet.value = wetValue;
    } else{
        effect.output.gain.value = wetValue;
    }

    return effect;
}