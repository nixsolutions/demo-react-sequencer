import {
    REVERBERATOR,
    PING_PONG_DELAY,
    FEEDBACK_DELAY,
    FILTER,

    RANGE_SETTING_TYPE,
    TIME_SETTING_TYPE
} from 'modules/masterEffects';

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

export let effects = [
    getReverberatorDefaults(),
    getPingPongDelayDefaults(),
    getFeedbackDelayDefaults(),
    getFilterDefaults()
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