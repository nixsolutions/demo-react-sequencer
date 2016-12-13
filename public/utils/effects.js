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