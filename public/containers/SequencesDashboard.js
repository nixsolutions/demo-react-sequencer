import React, {Component} from 'react';
import SequencesDashboard from 'components/blocks/sequencesDashboard/SequencesDashboard';
import {connect} from 'react-redux';

export default connect(mapStateToProps)(SequencesDashboard);

function mapStateToProps(state) {
    return {
        instrumentsAmounts: state.instruments.allIds.length,
    };
}