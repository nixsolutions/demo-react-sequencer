import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { noteToPitch, volumeToDecibels} from 'utils/notes';
import {updateAccompanimentInstrument} from 'modules/accompanimentInstrument';
import {updateLoadingState} from 'modules/loadingState';

class PianoManager extends Component {
    constructor(props, state){
        super(props, state);

        this.playedNotes = {};
        this.buffer = null;
    }

    componentWillMount(){
        this.initInstrument();
    }

    componentWillReceiveProps(props){
        let {playedNotes, accompanimentInstrument} = props;

        if(playedNotes !== this.props.playedNotes){
            this.updatePlayedNotes(playedNotes);
        }

        if(accompanimentInstrument !== this.props.accompanimentInstrument){
            this.updateBuffer(accompanimentInstrument);
        }
    }

    render(){ return <div></div> }

    updatePlayedNotes(notes){
        let currentNotes = Object.keys(this.playedNotes);
        let diedNotes = this.excludeFromArray(notes, currentNotes)

        notes.forEach(note => {
            if(this.playedNotes[note]){ return; }

            this.attackNote(note);
        });

        diedNotes.forEach(note => this.releaseNote(note));
    }

    excludeFromArray(items, array){
        return array.filter(item => items.indexOf(item) === -1);
    }

    attackNote(note){
        let sample = new Tone.Sampler(this.buffer).fan(this.props.analyser).toMaster();
        let pitch = noteToPitch(note);

        this.playedNotes[note] = sample;

        sample.volume.value = volumeToDecibels(this.props.pianoVolume);
        sample.triggerAttack(pitch);
    }

    releaseNote(note){
        this.playedNotes[note].triggerRelease();
        delete this.playedNotes[note];
    }

    initInstrument(){
        this.props.updateAccompanimentInstrument(this.props.samples[0]);
    }

    updateBuffer(accompanimentInstrument){
        let {path} = accompanimentInstrument;
        if(!path){ return; }

        this.props.updateLoadingState(true);
        this.buffer = new Tone.Buffer(path);
    }
}

PianoManager.propTypes = {
    playedNotes: PropTypes.array
};

export default connect(mapStateToProps, {
    updateLoadingState,
    updateAccompanimentInstrument
})(PianoManager);

function mapStateToProps(state){
     return {
        samples: state.samples,
        playedNotes: state.playedNotes,
        analyser: state.analyser,
        pianoVolume: state.pianoVolume,
        accompanimentInstrument: state.accompanimentInstrument,
    };
}