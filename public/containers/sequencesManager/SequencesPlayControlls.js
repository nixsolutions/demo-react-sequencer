import React, {Component} from 'react';
import PlayControls from 'components/blocks/playControls/PlayControls';
import {connect} from 'react-redux';
import {updatePlay} from 'modules/play';
import {bindToKey} from 'modules/bindings';

export default connect(mapStateToProps, {
    updatePlay,
    bindToKey
})(PlayControls);

function mapStateToProps(state) {
    return {
        playState: state.play,
    };
}