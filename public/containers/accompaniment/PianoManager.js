import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import {
    noteToPitch
} from 'utils/notes';

class PianoManager extends Component {
    constructor(props, state){
        super(props, state);

        this.playedNotes = {};
        this.buffer = null;
    }

    componentWillMount(){
        this.buffer = new Tone.Buffer('./samples/piano.wav');
    }

    componentWillReceiveProps(props){
        let {playedNotes} = props;

        if(playedNotes !== this.props.playedNotes){
            this.updatePlayedNotes(playedNotes);
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
        let sample = new Tone.Sampler(this.buffer).toMaster();
        let pitch = noteToPitch(note);

        this.playedNotes[note] = sample;

        sample.triggerAttack(pitch);
    }

    releaseNote(note){
        this.playedNotes[note].triggerRelease();
        delete this.playedNotes[note];
    }
}

PianoManager.propTypes = {
    playedNotes: PropTypes.array
};

export default connect(mapStateToProps, {
    
})(PianoManager);

function mapStateToProps(state){
     return {
        playedNotes: state.playedNotes
    };
}