import React, {PureComponent} from 'react';
import VolumeController from 'components/blocks/volumeController/VolumeController';
import {connect} from 'react-redux';
import { updateVolume } from 'modules/volume';

export default connect(mapStateToProps, {
   onChange: updateVolume 
})(VolumeController);

function mapStateToProps(state) {
    return {
        value: state.volume
    };
}