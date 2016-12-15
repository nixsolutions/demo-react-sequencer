import Tone from 'tone';

import {mapObject} from 'utils/helper';

export const REVERBERATOR = 'REVERBERATOR';
export const PING_PONG_DELAY = 'PING_PONG_DELAY';
export const FEEDBACK_DELAY = 'FEEDBACK_DELAY';
export const CHORUS = 'CHORUS';

export const RANGE_SETTING_TYPE = 'RANGE';
export const FREQUENCY_SETTING_TYPE = 'FREQUENCY_SETTING_TYPE';

let getReverberatorDefaults = () => ({
    id: Date.now(),
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
    id: Date.now(),
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
    id: Date.now(),
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
    id: Date.now(),
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

export let getEffect = (effectType) => {
    let result;

    effects.forEach(effect => {
        if(effect.type === effectType){
            result = effect;
        }
    })
    result.id = Date.now();

    return result;
}

export let getEffectsList = () => {
    return effects.map(effect => ({title: effect.label, value: effect.type}));
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


export let createEffect = (effectOptions) => {
    let {settings} = effectOptions;
    let effectInstance;
    let delayTime;
    let feedback;
    let roomSize;
    let frequency;
    let depth;
    let width;

    switch(effectOptions.type){
        case REVERBERATOR:
            roomSize = getSettingValue(settings.roomSize);

            effectInstance = new Tone.JCReverb(roomSize);
            break;
        case PING_PONG_DELAY:
            delayTime = getSettingValue(settings.delayTime);
            feedback = getSettingValue(settings.feedback);

            effectInstance = new Tone.PingPongDelay(delayTime, feedback);
            break;
        case FEEDBACK_DELAY:
            delayTime = getSettingValue(settings.delayTime);
            feedback = getSettingValue(settings.feedback);

            effectInstance = new Tone.FeedbackDelay(delayTime, feedback);
            break;
        case CHORUS:
            frequency = getSettingValue(settings.frequency);
            delayTime = getSettingValue(settings.delayTime);
            depth = getSettingValue(settings.depth);

            effectInstance = new Tone.Chorus(frequency, delayTime, depth);
            break;
    }

    effectInstance.wet.value = effectOptions.active ? (effectOptions.wet / 100) : 0;
    return effectInstance;
}

export let applySettingsToEffect = (effectOptions, effect) => {
    let {settings} = effectOptions;

    mapObject(settings, (settingName, settingOptions) => {
        let value = getSettingValue(settingOptions);

        if(effect[settingName].value !== undefined){
            effect[settingName].value = value;
        }else{
            effect[settingName] = value ;
        }
        
    });

    effect.wet.value = effectOptions.active ? (effectOptions.wet / 100) : 0;
    return effect;
}