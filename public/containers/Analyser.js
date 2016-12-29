import React, {PureComponent} from 'react';
import Analyser from 'components/blocks/analyser/Analyser';
import {connect} from 'react-redux';

export default connect(mapStateToProps)(Analyser);

function mapStateToProps(state) {
    return {
        analyser: state.analyser
    };
}