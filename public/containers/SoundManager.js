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
        this.loadSamples(this.props.samples);
        this.applyUpdates(this.props);

        Tone.Buffer.on('load', () => Tone.Transport.start());
    }

    componentWillReceiveProps(nextProps) {
        this.applyUpdates(nextProps);
    }

    render(){ return <div></div>; }

    applyUpdates(nextProps){
        let {instruments, play, bpm, volume} = nextProps;

        if (bpm !== this.props.bpm) {
            this.updateBPM(bpm);
        }

        if (instruments !== this.props.instruments) {
            this.updateMatrix(instruments);
            this.updateSequence();
        }

        if (play !== this.props.play) {
            this.togglePlay(instruments, play);
        }

        if (volume !== this.props.volume) {
            this.updateMasterVolume(volume);
        }
    }

    togglePlay(instruments, state){
        switch(state){
            case 'play':
                this.play(instruments);
                break;
            case 'pause':
                this.pause();
                break;
            case 'stop':
                this.stop();
                break;
        }
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
            Tone.Transport.start();
            this.sequencer.start(0);
        });
    }

    pause(){
        Tone.Transport.pause();
        this.sequencer.stop();
    }

    stop(){
        Tone.Transport.stop();
        this.sequencer.stop();
        this.props.updatePlayedStep(-1);
    }

    updateBPM(value){
        Tone.Transport.bpm.value = value || 1;
    }

    loadSamples(samples){
        this.samples = samples.reduce((result, sample) => {
            result[sample.path] = new Tone.Sampler(sample.path).fan(this.analyser).toMaster();
            return result;
        }, {});
    }

    updateMatrix(instruments){
        this.matrix = this.createMatrix(instruments);
    }

    updateMasterVolume(volumePercents){
        Tone.Master.volume.value = this.toDecibels(volumePercents);
    }

    toDecibels(volume){
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

    createSequencer(){
        this.sequencer = new Tone.Sequence((time, step) => {
            for(let key in step){
                let {note, path, volume} = step[key];
                let sample = this.samples[path];
                let processedVolume = volume / 100;

                sample.triggerAttackRelease(note, undefined, undefined, processedVolume);
            }
    
            let currentStepIndex = this.matrix.indexOf(step);
            this.props.updatePlayedStep(currentStepIndex);
        }, this.matrix, "16n");
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
    volume: PropTypes.number,
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
        bpm: state.bpm,
        volume: state.volume,
        volume: state.volume,
        samples: state.samples,
    };
}