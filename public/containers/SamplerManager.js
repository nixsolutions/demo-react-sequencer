import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import {updatePlayedStep} from 'modules/playedStep';
import {updateLoadingState} from 'modules/loadingState';
import {createEffect, applySettingsToEffect} from 'utils/effects';
import {mapObject} from 'utils/helper';

class SamplerManager extends Component {
    constructor(props, context){
        super(props, context);

        this.sequencer = null;
        this.matrix = [];
        this.samples = {};
        this.buffers = {};
        this.instrumentsEffects = {};
    }

    componentWillMount() {
        let buffersPaths = this.props.samples.map(sample => sample.path);

        this.loadBuffers(buffersPaths);
        this.createSequencer(this.matrix, this.samples);
        this.applyUpdates(this.props);
        this.updateBPM(this.props.bpm);
        this.updateMatrix(this.props.instruments);
        this.updateSequence();
    }

    componentWillReceiveProps(nextProps) {
        this.applyUpdates(nextProps);
    }

    render(){ return <div></div> }

    applyUpdates(nextProps){
        let {instruments, instrumentsEffects, play, bpm, volume} = nextProps;

        if (bpm !== this.props.bpm) {
            this.updateBPM(bpm);
        }

        if (instruments !== this.props.instruments) {
            this.updateSamples(instruments);
            this.updateMatrix(instruments);
            this.updateSequence();
        }

        if (instrumentsEffects !== this.props.instrumentsEffects) {
            this.updateInstrumentsEffects(instrumentsEffects);
        }

        if (play !== this.props.play) {
            this.togglePlay(instruments, play);
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

    play(){
        Tone.Transport.start();
        this.sequencer.start();
    }

    pause(){
        Tone.Transport.pause();
    }

    stop(){
        Tone.Transport.stop();
        this.props.updatePlayedStep(-1);
    }

    updateBPM(value){
        Tone.Transport.bpm.value = value || 1;
    }

    updateSamples(instruments){
        let oldSamples = {...this.samples};
        let newSamples = {};

        instruments.forEach(instrument => {
            if(oldSamples[instrument.name]){
                newSamples[instrument.name] = oldSamples[instrument.name];
            }else{
                newSamples[instrument.name] = new Tone.Sampler(this.buffers[instrument.path]).toMaster();
            }

            delete oldSamples[instrument.name];
        });

        this.samples = newSamples;
        this.destroySamples(oldSamples);
    }

    destroySamples(samples){
        mapObject(samples, (key, sample) => {
            sample.dispose();
            delete samples[key];
        });
    }

    updateInstrumentsEffects(instrumentsEffects){
        let oldInstrumentsEffects = {...this.instrumentsEffects};
        let newInstrumentsEffects = {};

        mapObject(instrumentsEffects, (instrumentName, effectsSettings) => {
            let sample = this.samples[instrumentName];

            effectsSettings.forEach(effectSettings => {
                let instrumentEffects = oldInstrumentsEffects[instrumentName] || {};
                newInstrumentsEffects[instrumentName] = newInstrumentsEffects[instrumentName] || {};

                if(!instrumentEffects[effectSettings.id]){
                    let effect = newInstrumentsEffects[instrumentName][effectSettings.id] = createEffect(effectSettings);

                    this.samples[instrumentName].chain(effect, Tone.Master);
                }else{
                    applySettingsToEffect(effectSettings, instrumentEffects[effectSettings.id]);
                    newInstrumentsEffects[instrumentName][effectSettings.id] = instrumentEffects[effectSettings.id];
                }

                oldInstrumentsEffects[instrumentName] && delete oldInstrumentsEffects[instrumentName][effectSettings.id];
            });
        });

        this.instrumentsEffects = newInstrumentsEffects;
        this.destroyInstrumentsEffects(oldInstrumentsEffects);
    }

    destroyInstrumentsEffects(instrumentsEffects){
        mapObject(instrumentsEffects, (instrumentName, effects) => {
            mapObject(effects, (effectId, effect) => {
                effect.disconnect();
                effect.dispose();
                delete effects[effectId];
            });
        });
    }

    loadBuffers(samplesPaths){
        this.props.updateLoadingState(true);
    
        this.buffers = samplesPaths.reduce((result, samplePath) => {
            result[samplePath] = new Tone.Buffer(samplePath);
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

                if((note === undefined) || !instrument.active) { return; }

                let {volume, path, name} = instrument;

                matrix[i][name] = {note, volume, path, name};
            });

            return matrix;
        }, []);
    }

    createSequencer(){
        this.sequencer = new Tone.Sequence((time, step) => {
            for(let key in step){
                let {note, path, volume, name} = step[key];
                let sample = this.samples[name];
                let processedVolume = volume / 100;

                sample.triggerAttackRelease(note, undefined, undefined, processedVolume);
            }
    
            let currentStepIndex = this.matrix.indexOf(step);
            this.props.updatePlayedStep(currentStepIndex);
        }, [], "16n");

        this.sequencer.loopStart = '0m';
        this.sequencer.loopEnd = '1m';
    }

    updateSequence(){
        if(!this.sequencer) { return; }

        this.sequencer.removeAll();

        this.matrix.forEach((item, i) => {
            this.sequencer.add(i, item);
        });
    }
}

SamplerManager.propTypes = {
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
    updatePlayedStep: PropTypes.func,
    updateLoadingState: PropTypes.func,
};

export default connect(mapStateToProps, {
    updatePlayedStep,
    updateLoadingState
})(SamplerManager);

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        instrumentsEffects: state.instrumentsEffects,
        play: state.play,
        bpm: state.bpm,
        samples: state.samples,
    };
}