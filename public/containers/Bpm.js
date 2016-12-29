import React, {PureComponent} from 'react';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import {connect} from 'react-redux';
import {updateBPM} from 'modules/bpm';

export default connect(mapStateToProps, {
    onChange: updateBPM
})(BpmEditor);

function mapStateToProps(state) {
    return {
        value: state.bpm
    };
}