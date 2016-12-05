import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PlayControls from 'components/blocks/playControls/PlayControls';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import Slider from 'components/common/slider/Slider';
import Analyser from 'components/blocks/analyser/Analyser';
import {updatePlay} from 'modules/play';
import {updateBPM} from 'modules/bpm';
import {updateVolume} from 'modules/volume';



class PanelControls extends Component {
    render() {
        return (
                <div>
                    <PlayControls updatePlay={this.props.updatePlay}
                                  playState={this.props.play}
                    />
                    <Analyser analyser={this.props.analyser}/>
                    <Slider value={this.props.volume} onChange={this.props.updateVolume}/>
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
    updatePlay: PropTypes.func,
    updateBPM: PropTypes.func
};

export default connect(mapStateToProps, {
    updatePlay,
    updateBPM,
    updateVolume
})(PanelControls);

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