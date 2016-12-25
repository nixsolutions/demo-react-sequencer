import React, {Component} from 'react';
import Sequences from 'components/blocks/sequences/Sequences';
import {connect} from 'react-redux';
import {
    toggleStep,
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume
} from 'modules/instruments';

export default connect(mapStateToProps, {
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume,
    onToggleStep: toggleStep
})(Sequences);

function mapStateToProps(state) {
    return {
        instruments: state.instruments,
        playedStep: state.playedStep,
    };
}