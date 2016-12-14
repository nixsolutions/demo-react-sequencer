import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'components/common/dropdown/Dropdown';
import Effects from 'components/blocks/effects/Effects';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';
import {getEffectsList} from 'utils/effects';
import {
    addInstrumentEffect,
    removeInstrumentEffect,
    toggleMuteInstrumentEffect,
    changeWetInstrumentEffect,
    changeSettingInstrumentEffect,
} from 'modules/instrumentsEffects';

class InstrumentEffects extends Component {
    render() {
        let effects = this.props.instrumentsEffects[this.props.instrumentName];

        return (
            <div styleName="instrument-effects">
                <ScrollableBlock>
                    <Dropdown title='Add effect'
                                onSelect={this.addInstrumentEffect.bind(this)} 
                                items={getEffectsList()}/>
                    <Effects effects={effects}
                        remove={this.removeEffect.bind(this)}
                        toggleMute={this.toggleMute.bind(this)}
                        changeWet={this.changeWet.bind(this)}
                        changeSetting={this.props.changeSettingInstrumentEffect}/>
                </ScrollableBlock>
            </div>
        );
    }

    addInstrumentEffect(effectType){
        this.props.addInstrumentEffect(effectType, this.props.instrumentName);
    }

    removeEffect(effectId){
        this.props.removeInstrumentEffect(effectId, this.props.instrumentName);
    }

    toggleMute(effectId){
        this.props.toggleMuteInstrumentEffect(effectId, this.props.instrumentName);
    }

    changeWet(value, effectId){
        this.props.changeWetInstrumentEffect(effectId, value, this.props.instrumentName);
    }
}

InstrumentEffects.propTypes = {
    instrumentName: PropTypes.string,
    instrumentsEffects: PropTypes.object,

    addInstrumentEffect: PropTypes.func,
    removeInstrumentEffect: PropTypes.func,
    toggleMuteInstrumentEffect: PropTypes.func,
    changeWetInstrumentEffect: PropTypes.func,
    changeSettingInstrumentEffect: PropTypes.func,
};

export default connect(mapStateToProps, {
    addInstrumentEffect,
    removeInstrumentEffect,
    toggleMuteInstrumentEffect,
    changeWetInstrumentEffect,
    changeSettingInstrumentEffect
})(CSSModules(InstrumentEffects, styles, { allowMultiple: true }));

function mapStateToProps(state){
    return {
        instrumentsEffects: state.instrumentsEffects
    }
}