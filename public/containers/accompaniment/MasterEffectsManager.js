import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { noteToPitch, volumeToDecibels} from 'utils/notes';
import {
    REVERBERATOR,
    DELAY,
    FILTER,
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
        let commonEffects = this.extractCommonEffects(effects);
        this.updateEffectsSettings(commonEffects);

        let newEffectsOptions = this.extractNewEffectsOptions(effects);
        this.addEffects(newEffectsOptions);

        let removedEffectsKeys = this.extractAbsentEffectsKeys(effects);
        this.removeEffects(removedEffectsKeys);
    }

    addEffects(effectsOptions){
        effectsOptions.forEach(effectOptions => {
            let effectInstance = this.createEffect(effectOptions);
            Tone.Master.chain(effectInstance);
            this.effects[effectOptions.id] = effectInstance;
        });

        return this.effects;
    }

    removeEffects(effectsKeys){
        effectsKeys.forEach(effectKey => {
            this.effects[effectKey].wet.value = 0;
            delete this.effects[effectKey];
        });
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

    extractNewEffectsOptions(effects){
        let oldEffectIds = Object.keys(this.effects);

        return effects.filter(effect => oldEffectIds.indexOf(String(effect.id)) === -1);
    }

    extractAbsentEffectsKeys(effects){
        let oldEffectIds = Object.keys(this.effects);

        return oldEffectIds.reduce((result, oldEffectId) => {
            if(effects.some(effect => String(effect.id) === oldEffectId)){ return result;}

            result.push(oldEffectId);

            return result;
        }, []);
    }

    extractCommonEffects(effects){
        let oldEffectIds = Object.keys(this.effects);

        return effects.filter(effect => oldEffectIds.indexOf(String(effect.id)) !== -1);
    }

    createEffect(effectOptions){
        let {settings} = effectOptions;
        let effectInstance;

        switch(effectOptions.type){
            case REVERBERATOR:
                effectInstance = new Tone.JCReverb(settings.roomSize.value / 100);
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