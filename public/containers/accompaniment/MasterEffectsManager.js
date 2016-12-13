import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { noteToPitch, volumeToDecibels} from 'utils/notes';
import { createEffect } from 'utils/effects';

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
            let effectInstance = createEffect(effectOptions);

            this.effects[effectOptions.id] = effectInstance;
        });

        return this.effects;
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