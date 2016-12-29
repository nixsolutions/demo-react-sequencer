import React, {PureComponent, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import { noteToPitch, percentsToDecibels} from 'utils/notes';
import {updateAccompanimentInstrument} from 'modules/accompanimentInstrument';
import {updateLoadingState} from 'modules/loadingState';

class PianoManager extends PureComponent {
    static propTypes = {
        playedNotes: PropTypes.array,
        samples: PropTypes.array,
        pianoVolume: PropTypes.number,
        accompanimentInstrument: PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string
        }),
        updateLoadingState: PropTypes.func,
        updateAccompanimentInstrument: PropTypes.func,
    }

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
        let sample = new Tone.Sampler(this.buffer).toMaster();
        let pitch = noteToPitch(note);

        this.playedNotes[note] = sample;

        sample.volume.value = percentsToDecibels(this.props.pianoVolume);
        sample.triggerAttackRelease(pitch);
    }

    releaseNote(note){
        // todo this should be uncommitted if you want note shout on keyup
        // this.playedNotes[note].triggerRelease();
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

export default connect(mapStateToProps, {
    updateLoadingState,
    updateAccompanimentInstrument
})(PianoManager);

function mapStateToProps(state){
     return {
        samples: state.samples,
        playedNotes: state.playedNotes,
        pianoVolume: state.pianoVolume,
        accompanimentInstrument: state.accompanimentInstrument,
    };
}