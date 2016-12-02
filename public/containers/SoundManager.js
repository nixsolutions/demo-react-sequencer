import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import {updatePlayedStep} from 'modules/playedStep';
import {updateAnalyser} from 'modules/analyser';

class SoundManager extends Component {
    constructor(props, context){
        super(props, context);

        this.sequencer = null;
        this.analyser = null;
        this.matrix = [];
        this.samples = {};
    }

    componentWillMount() {
        this.initAnalyser();
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
            this.updateSequence();
            this.updateVolumes(instruments);
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
        this.updateVolumes(instruments);
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
            result[instrument.name] = new Tone.Sampler(instrument.path).toMaster();
            return result;
        }, {});
    }

    updateMatrix(instruments){
        this.matrix = this.createMatrix(instruments);
    }

    updateVolumes(instruments){
        instruments.forEach(instrument => {
            let sample = this.samples[instrument.name];
            if(!sample) { return; }

            sample.volume.value = this.getDecibels(instrument.volume);
        })
    }

    getDecibels(volume){
        return -40 + ((40 / 100) * volume);
    }

    createMatrix(instruments){
        return instruments.reduce((matrix, instrument) => {

            instrument.notes.forEach((note, i) => {
                matrix[i] = matrix[i] || {};

                if(note === undefined) {return;}
                if(!instrument.active) {return;}

                matrix[i][instrument.name] = note;
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
        }, matrix, "8n");
    }

    updateSequence(){
        if(!this.sequencer) { return; }

        this.matrix.forEach((item, i) => {
            this.sequencer.at(i, item);
        });
    }

    initAnalyser(){
        this.analyser = new Tone.Analyser("fft", 32);
        this.props.updateAnalyser(this.analyser);
    }
}

SoundManager.propTypes = {
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            volume: PropTypes.number,
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
    updatePlayedStep,
    updateAnalyser
})(SoundManager);

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        play: state.play,
        bpm: state.bpm
    };
}