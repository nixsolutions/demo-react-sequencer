import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import VolumeController from 'components/blocks/volumeController/VolumeController';
import Analyser from 'components/blocks/analyser/Analyser';
import {updateBPM} from 'modules/bpm';
import {updateVolume} from 'modules/volume';

class PanelControls extends Component {
    render() {
        return (
                <div styleName="panel-controls">
                    <VolumeController value={this.props.volume} 
                                    onChange={this.props.updateVolume}/>
                    <Analyser analyser={this.props.analyser}/>
                    <BpmEditor onChange={this.props.updateBPM} value={this.props.bpm}/>
                 </div>
        )
    }
    
}

PanelControls.propTypes = {
    play: PropTypes.string,
    bpm: function(props, propName, componentName) {
        let isNumber = typeof props[propName] === 'number';
        let isEmptyString = props[propName] === '';

        if (!isNumber && !isEmptyString)  {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    playedStep: PropTypes.number,
    instruments: PropTypes.array,
    analyser: PropTypes.object,
    updateBPM: PropTypes.func,
    updateVolume: PropTypes.func,
};

export default connect(mapStateToProps, {
    updateBPM,
    updateVolume,
})(CSSModules(PanelControls, styles));

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        play: state.play,
        bpm: state.bpm,
        playedStep: state.playedStep,
        volume: state.volume,
        analyser: state.analyser
    };
}