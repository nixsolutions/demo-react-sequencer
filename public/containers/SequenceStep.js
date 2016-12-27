import React, {Component} from 'react';
import Step from 'components/blocks/sequence/sequenceEditor/step/Step';
import {connect} from 'react-redux';
import {toggleStep} from 'modules/instrumentsSteps';

export default connect(mapStateToProps, {
    onToggleStep: toggleStep
})(Step);

function mapStateToProps(state, props) {
    let {instrumentId, indexInSequence} = props;
    let steps = state.instrumentsSteps[instrumentId];
    let step = steps[indexInSequence];

    let isActive = step !== undefined;

    return {
        isActive
    };
}