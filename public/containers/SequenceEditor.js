import React, {Component} from 'react';
import SequenceEditor from 'components/blocks/sequence/sequenceEditor/SequenceEditor';
import {connect} from 'react-redux';

export default connect(mapStateToProps)(SequenceEditor);

function mapStateToProps(state, props) {
    return {
        steps: state.instrumentsSteps[props.instrumentId]
    };
}