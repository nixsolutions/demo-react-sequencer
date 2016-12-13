import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { noteToPitch, volumeToDecibels} from 'utils/notes';
import {
    REVERBERATOR,
    PING_PONG_DELAY,
    FEEDBACK_DELAY,
    CHORUS,
    FILTER,

    RANGE_SETTING_TYPE,
    TIME_SETTING_TYPE,
    FREQUENCY_SETTING_TYPE
} from 'utils/effects';

class MasterEffectsManager extends Component {
    constructor(props, state){
        super(props, state);

        this.effects = {};
    }

    componentWillMount(){
        this.updateEffects(this.props.masterEffects);
    }

    componentWillReceiveProps(props){
        let {masterEffects} = props;

        if(masterEffects !== this.props.masterEffects){
            this.updateEffects(masterEffects);
        }
    }

    render(){ return <div></div> }

    updateEffects(effects){
        this.clear();
        this.addEffects(effects);
        this.rechain();
    }

    clear(){
        let effectsIds = Object.keys(this.effects);
        effectsIds.forEach(effectId => this.effects[effectId].dispose());
        this.effects = {};
    }

    rechain(){
        let effectsIds = Object.keys(this.effects);
        let effects = effectsIds.map(effectId => this.effects[effectId]);

        effects.push(new Tone.Gain());

        if(effects.length){
            Tone.Master.chain.apply(Tone.Master, effects);
        }
    }

    addEffects(effectsOptions){
        effectsOptions.forEach(effectOptions => {
            let effectInstance = this.createEffect(effectOptions);

            this.effects[effectOptions.id] = effectInstance;
        });

        return this.effects;
    }

    getSettingValue(setting, type){
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
                let range = 20000 - 20;
                let percentValue = range / 100;

                return percentValue * setting.value;
            default:
                return setting.value;
        }
    }

    createEffect(effectOptions){
        let {settings} = effectOptions;
        let effectInstance;
        let delayTime;
        let feedback;
        let roomSize;
        let frequency;
        let depth;

        switch(effectOptions.type){
            case REVERBERATOR:
                roomSize = this.getSettingValue(settings.roomSize.value, RANGE_SETTING_TYPE);

                effectInstance = new Tone.JCReverb(roomSize);
                break;
            case PING_PONG_DELAY:
                delayTime = this.getSettingValue(settings.delayTime.value, RANGE_SETTING_TYPE);
                feedback = this.getSettingValue(settings.feedback.value, RANGE_SETTING_TYPE);

                effectInstance = new Tone.PingPongDelay(delayTime, feedback);
                break;
            case FEEDBACK_DELAY:
                delayTime = this.getSettingValue(settings.delayTime.value, RANGE_SETTING_TYPE);
                feedback = this.getSettingValue(settings.feedback.value, RANGE_SETTING_TYPE);

                effectInstance = new Tone.FeedbackDelay(delayTime, feedback);
                break;
            case CHORUS:
                frequency = this.getSettingValue(settings.frequency.value, FREQUENCY_SETTING_TYPE);
                delayTime = this.getSettingValue(settings.delayTime.value, RANGE_SETTING_TYPE);
                depth = this.getSettingValue(settings.depth.value, RANGE_SETTING_TYPE);

                effectInstance = new Tone.Chorus(frequency, delayTime, depth);
                break;
        }

        effectInstance.wet.value = effectOptions.active ? (effectOptions.wet / 100) : 0;
        return effectInstance;
    }
}

MasterEffectsManager.propTypes = {
    masterEffects: PropTypes.array
};

export default connect(mapStateToProps, {

})(MasterEffectsManager);

function mapStateToProps(state){
     return {
        masterEffects: state.masterEffects
    };
}