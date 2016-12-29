import React, {Component} from 'react';
import Slider from 'components/common/slider/Slider';
import {connect} from 'react-redux';
import {updatePianoVolume} from 'modules/pianoVolume';

export default connect(mapStateToProps, {
    onChange: updatePianoVolume
})(Slider);

function mapStateToProps(state) {
    return {
        value: state.pianoVolume
    };
}