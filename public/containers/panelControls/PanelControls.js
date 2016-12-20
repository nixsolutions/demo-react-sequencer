import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VolumeController from 'components/blocks/volumeController/VolumeController';
import Analyser from 'components/blocks/analyser/Analyser';
import { updateVolume } from 'modules/volume';

class PanelControls extends Component {
    render() {
        let volumeControllerProps = {
            value: this.props.volume,
            onChange: this.props.updateVolume
        }

        return (
            <div styleName="panel-controls">
                <VolumeController {...volumeControllerProps}/>
                <Analyser analyser={this.props.analyser} />
            </div>
        )
    }

}

PanelControls.propTypes = {
    analyser: PropTypes.object,
    updateVolume: PropTypes.func,
};

export default connect(mapStateToProps, {
    updateVolume,
})(CSSModules(PanelControls, styles));

function mapStateToProps(state) {
    return {
        volume: state.volume,
        analyser: state.analyser
    };
}