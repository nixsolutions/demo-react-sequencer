import React, {Component} from 'react';
import MuteButton from 'components/blocks/sequence/muteButton/MuteButton';
import {connect} from 'react-redux';
import {toggleInstrument} from 'modules/instruments';

export default connect(mapStateToProps, {
    toggleInstrument
})(MuteButton);

function mapStateToProps(state, props){
    return {
        isActive: state.instruments.byId[props.instrumentId].active
    }
}