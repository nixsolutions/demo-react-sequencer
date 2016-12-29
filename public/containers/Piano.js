import React, {Component} from 'react';
import Piano from 'components/blocks/piano/Piano';
import {connect} from 'react-redux';
import {addPlayedNote, removePlayedNote} from 'modules/playedNotes';
import {bindToKey} from 'modules/bindings';

export default connect(mapStateToProps, {
    onKeyDown: addPlayedNote,
    onKeyUp: removePlayedNote,
    bindToKey
})(Piano);

function mapStateToProps(state) {
    return {
        playedNotes: state.playedNotes
    };
}