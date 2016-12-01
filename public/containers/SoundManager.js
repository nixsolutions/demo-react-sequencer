import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import {updatePlayedStep} from 'modules/playedStep';

class SoundManager extends Component {
    constructor(props, context){
        super(props, context);

        this.sequencer = null;
        this.matrix = [];
        this.samples = {};
    }

    componentWillMount() {
        this.applyUpdates(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.applyUpdates(nextProps);
    }

    render(){ return <div></div>; }

    applyUpdates(nextProps){
        let {instruments, play, bpm} = nextProps;

        if (bpm !== this.props.bpm) {
            this.updateBPM(bpm);
        }

        if (instruments !== this.props.instruments) {
            this.updateMatrix(instruments);
        }

        if (play !== this.props.play) {
            this.togglePlay(instruments, play);
        }
    }

    togglePlay(instruments, state){
        state ? this.play(instruments) : this.stop(instruments)
    }

    play(instruments){
        if(!instruments){
            throw new Error('Matrix doesn\'t exist');
        }

        this.updateSamples(instruments);
        this.updateMatrix(instruments);
        this.sequencer = this.createSequencer(this.matrix, this.samples);

        Tone.Buffer.on('load', () => {
            Tone.Transport.start()
            this.sequencer.start(0);
        });
    }

    stop(){
        this.sequencer.stop();
    }

    updateBPM(value){
        Tone.Transport.bpm.value = value;
    }

    updateSamples(instruments){
        this.samples = this.loadSamples(instruments);
    }

    loadSamples(instruments){
        return instruments.reduce((result, instrument) => {
            result[instrument.path] = new Tone.Sampler(instrument.path).toMaster();
            return result;
        }, {});
    }

    updateMatrix(instruments){
        this.matrix = this.createMatrix(instruments);
    }

    createMatrix(instruments){
        return instruments.reduce((matrix, instrument) => {

            instrument.notes.forEach((note, i) => {
                matrix[i] = matrix[i] || {};

                if(note === undefined) {return;}

                matrix[i][instrument.path] = note;
            });

            return matrix;
        }, []);
    }

    createSequencer(matrix, samples){
        return new Tone.Sequence((time, step) => {
            for(let key in step){
                let sample = samples[key];
                let note = step[key];

                sample.triggerAttackRelease(note);
            }
    
            let currentStepIndex = this.matrix.indexOf(step);
            this.props.updatePlayedStep(currentStepIndex);
        }, matrix, "4n");
    }
}

SoundManager.propTypes = {
    instruments: PropTypes.arrayOf(PropTypes.shape({
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    play: PropTypes.bool,
    bpm: PropTypes.number,
    updatePlayedStep: PropTypes.func,
};

export default connect(mapStateToProps, {
    updatePlayedStep
})(SoundManager);

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        play: state.play,
        bpm: state.bpm
    };
}