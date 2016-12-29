import React, {PureComponent} from 'react';
import InstrumentDashboard from 'components/blocks/sequence/instrumentDashboard/InstrumentDashboard';
import {connect} from 'react-redux';
import {updateBPM} from 'modules/bpm';

export default connect(mapStateToProps)(InstrumentDashboard);

function mapStateToProps(state, props) {
    return {
        instrumentName: state.instruments.byId[props.instrumentId].name
    };
}