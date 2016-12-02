import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PlayButton from 'components/common/buttons/playButton/PlayButton';
import PauseButton from 'components/common/buttons/pauseButton/PauseButton';
import StopButton from 'components/common/buttons/stopButton/StopButton';
import Sequences from 'components/blocks/sequences/Sequences';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import Controller from 'components/common/controller/Controller';
import Slider from 'components/common/slider/Slider';
import Analyser from 'components/blocks/analyser/Analyser';
import {updatePlay} from 'modules/play';
import {toggleStep, toggleInstrument, removeInstrument, updateInstrumentVolume} from 'modules/instruments';
import {updateBPM} from 'modules/bpm';
import {updateVolume} from 'modules/volume';

class Sampler extends Component {
    render(){
        return (
            <div>
                <Analyser analyser={this.props.analyser}/>
                <Slider value={this.props.volume} onChange={this.props.updateVolume}/>
                <BpmEditor onChange={this.props.updateBPM} value={this.props.bpm}/>
                <PlayButton active={this.props.play} 
                            onToggle={this.props.updatePlay}></PlayButton>
                <PauseButton active={!this.props.play} 
                            onToggle={this.props.updatePlay}></PauseButton>
                <StopButton active={!this.props.play} 
                            onToggle={this.props.updatePlay}></StopButton>
                <Sequences instruments={this.props.instruments}
                            playedStep={this.props.playedStep}
                            toggleInstrument={this.props.toggleInstrument}
                            removeInstrument={this.props.removeInstrument}
                            updateInstrumentVolume={this.props.updateInstrumentVolume}
                            onToggleStep={this.props.toggleStep}/>
            </div>
        ); 
    }
}

Sampler.propTypes = {
    play: PropTypes.bool,
    bpm: PropTypes.number,
    playedStep: PropTypes.number,
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            volume: PropTypes.number,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    updatePlay: PropTypes.func,
    toggleStep: PropTypes.func,
    updateBPM: PropTypes.func,
    toggleInstrument: PropTypes.func,
    removeInstrument: PropTypes.func,
    updateInstrumentVolume: PropTypes.func,
};

export default connect(mapStateToProps, {
    updatePlay,
    toggleStep,
    updateBPM,
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume,
    updateVolume
})(Sampler);

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        play: state.play,
        bpm: state.bpm,
        playedStep: state.playedStep,
<<<<<<< HEAD
        volume: state.volume
=======
        analyser: state.analyser,
>>>>>>> master
    };
}