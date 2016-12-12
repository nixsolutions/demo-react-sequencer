import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { noteToPitch, volumeToDecibels} from 'utils/notes';
import {
    REVERBERATOR,
    DELAY,
    FILTER,

    RANGE_SETTING_TYPE,
    TIME_SETTING_TYPE,
} from 'modules/masterEffects';

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
        this.updateEffectsSettings(effects);
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

    updateEffectsSettings(effectsOptions){
        effectsOptions.forEach(effectOptions => {
            let masterEffect = this.effects[effectOptions.id];

            masterEffect.wet.value = effectOptions.active ? (effectOptions.wet / 100) : 0;
            this.updateSettings(masterEffect, effectOptions.settings)
        });
    }

    updateSettings(effect, settings){
        let settingsTypes = Object.keys(settings);

        settingsTypes.forEach(type => {
            let setting = settings[type]
            effect[type].value = this.getSettingValue(setting);
        });
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
            default:
                return setting.value;
        }
    }

    createEffect(effectOptions){
        let {settings} = effectOptions;
        let effectInstance;

        switch(effectOptions.type){
            case REVERBERATOR:
                let roomSize = this.getSettingValue(settings.roomSize.value, RANGE_SETTING_TYPE);

                return effectInstance = new Tone.JCReverb(roomSize);
            case DELAY:
                let delayTime = this.getSettingValue(settings.delayTime.value, RANGE_SETTING_TYPE);
                let feedback = this.getSettingValue(settings.feedback.value, RANGE_SETTING_TYPE);

                return effectInstance = new Tone.PingPongDelay(delayTime, feedback);
        }

        effectInstance.wet.value = effectOptions.wet / 100;
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