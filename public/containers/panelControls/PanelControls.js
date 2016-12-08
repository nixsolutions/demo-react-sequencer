import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PlayControls from 'components/blocks/playControls/PlayControls';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import Slider from 'components/common/slider/Slider';
import Analyser from 'components/blocks/analyser/Analyser';
import {updatePlay} from 'modules/play';
import {updateBPM} from 'modules/bpm';
import {updateVolume} from 'modules/volume';
import {bindToKey} from 'modules/bindings';



class PanelControls extends Component {
    render() {
        return (
                <div styleName="panel-controls">
                    <PlayControls updatePlay={this.props.updatePlay} 
                                playState={this.props.play} 
                                bindToKey={this.props.bindToKey}/>
                    <Slider value={this.props.volume} onChange={this.props.updateVolume}/>
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
    updatePlay: PropTypes.func,
    updateBPM: PropTypes.func,
    updateVolume: PropTypes.func,
    bindToKey: PropTypes.func,
};

export default connect(mapStateToProps, {
    updatePlay,
    updateBPM,
    updateVolume,
    bindToKey
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