import React, {Component} from 'react';
import Effects from 'components/blocks/effects/Effects';
import {connect} from 'react-redux';
import {
    changeWetMasterEffect,
    toggleMuteMasterEffect,
    changeSettingMasterEffect,
} from 'modules/masterEffects';

export default connect(mapStateToProps, {
    toggleMute: toggleMuteMasterEffect,
    changeWet: changeWetMasterEffect,
    changeSetting: changeSettingMasterEffect
})(Effects);

function mapStateToProps(state) {
    return {
        effects: state.masterEffects
    };
}