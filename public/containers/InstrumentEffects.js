import CSSModules from 'react-css-modules';
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Effects from 'components/blocks/effects/Effects';
import {
    toggleMuteInstrumentEffect,
    changeWetInstrumentEffect,
    changeSettingInstrumentEffect,
} from 'modules/instrumentsEffects';

class InstrumentEffects extends PureComponent {
    static propTypes = {
        instrumentName: PropTypes.string,
        instrumentsEffects: PropTypes.object,
        toggleMuteInstrumentEffect: PropTypes.func,
        changeWetInstrumentEffect: PropTypes.func,
        changeSettingInstrumentEffect: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.toggleMute = this.toggleMute.bind(this);
        this.changeWet = this.changeWet.bind(this);
        this.changeSetting = this.changeSetting.bind(this);
    }

    render() {
        let effects = this.props.instrumentsEffects[this.props.instrumentName];
        let effectsProps = {
            effects,
            toggleMute: this.toggleMute,
            changeWet: this.changeWet,
            changeSetting: this.changeSetting
        };

        return (
            <div styleName="instrument-effects">
                <Effects {...effectsProps}/>
            </div>
        );
    }

    toggleMute(effectId){
        this.props.toggleMuteInstrumentEffect(effectId, this.props.instrumentName);
    }

    changeWet(value, effectId){
        this.props.changeWetInstrumentEffect(effectId, value, this.props.instrumentName);
    }

    changeSetting(type, value, effectId){
        this.props.changeSettingInstrumentEffect(effectId, type, value, this.props.instrumentName);
    }
}

export default connect(mapStateToProps, {
    toggleMuteInstrumentEffect,
    changeWetInstrumentEffect,
    changeSettingInstrumentEffect
})(InstrumentEffects);

function mapStateToProps(state){
    return {
        instrumentsEffects: state.instrumentsEffects
    }
}