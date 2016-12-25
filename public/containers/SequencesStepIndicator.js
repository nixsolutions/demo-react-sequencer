import React, {Component} from 'react';
import StepIndicator from 'components/blocks/stepIndicator/StepIndicator';
import {connect} from 'react-redux';

export default connect(mapStateToProps)(StepIndicator);

function mapStateToProps(state) {
    return {
        activeIndex: state.playedStep
    };
}