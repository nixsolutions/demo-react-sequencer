import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PlayButton from 'components/common/buttons/playButton/PlayButton';
import Sequences from 'components/blocks/sequences/Sequences';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import Controller from 'components/common/controller/Controller';
import {updatePlay} from 'modules/play';
import {toggleStep, toggleInstrument, removeInstrument} from 'modules/instruments';
import {updateBPM} from 'modules/bpm';

class Sampler extends Component {
    render(){
        return (
            <div>
                <BpmEditor onChange={this.props.updateBPM} value={this.props.bpm}/>
                <PlayButton active={this.props.play} 
                            onToggle={this.props.updatePlay}></PlayButton>
                <Sequences instruments={this.props.instruments}
                            playedStep={this.props.playedStep}
                            toggleInstrument={this.props.toggleInstrument}
                            removeInstrument={this.props.removeInstrument}
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
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    updatePlay: PropTypes.func,
    toggleStep: PropTypes.func,
    updateBPM: PropTypes.func,
    toggleInstrument: PropTypes.func,
    removeInstrument: PropTypes.func
};

export default connect(mapStateToProps, {
    updatePlay,
    toggleStep,
    updateBPM,
    toggleInstrument,
    removeInstrument
})(Sampler);

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        play: state.play,
        bpm: state.bpm,
        playedStep: state.playedStep,
    };
}