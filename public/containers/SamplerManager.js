import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import {updatePlayedStep} from 'modules/playedStep';
import {updateLoadingState} from 'modules/loadingState';
import {createEffect, applySettingsToEffect} from 'utils/effects';
import {mapObject} from 'utils/helper';

class SamplerManager extends Component {
    // static propTypes = {
    //     instrumentsById: PropTypes.object,
    //     stepsAmount: PropTypes.number,
    //     play: PropTypes.string,
    //     updatePlayedStep: PropTypes.func,
    //     updateLoadingState: PropTypes.func,
    // }

    // constructor(props){
    //     super(props);

    //     this.sequencer = null;
    //     this.matrix = [];
    //     this.samples = {};
    //     this.buffers = {};
    //     this.instrumentsEffects = {};
    // }

    // componentWillMount() {
    //     let buffersPaths = this.props.samples.map(sample => sample.path);

    //     this.loadBuffers(buffersPaths);
    //     this.createSequencer(this.matrix, this.samples);
    //     this.applyUpdates(this.props);
    //     this.updateMatrix(this.props.instrumentsById, this.props.instrumentsSteps);
    //     this.updateSequence();

    //     this.initializeInstruments();
    // }

    // componentWillReceiveProps(nextProps) {
    //     this.applyUpdates(nextProps);
    // }

    // render(){ return <div></div> }

    applyUpdates(nextProps){
        let {instrumentsById, instrumentsEffects, play, volume, instrumentsSteps} = nextProps;

        if ((instrumentsById !== this.props.instrumentsById) || (instrumentsSteps !== this.props.instrumentsSteps)) {
            this.updateMatrix(instrumentsById, instrumentsSteps);
            this.updateSequence();
        }

        if (instrumentsById !== this.props.instrumentsById) {
            this.updateSamples(instrumentsById);
        }

        if (instrumentsEffects !== this.props.instrumentsEffects) {
            this.updateInstrumentsEffects(instrumentsEffects);
        }

        if (play !== this.props.play) {
            this.togglePlay(play);
        }
    }

    // togglePlay(state){
    //     switch(state){
    //         case 'play':
    //             this.play();
    //             break;
    //         case 'pause':
    //             this.pause();
    //             break;
    //         case 'stop':
    //             this.stop();
    //             break;
    //     }
    // }

    // play(){
    //     Tone.Transport.start();
    //     this.sequencer.start();
    // }

    // pause(){
    //     Tone.Transport.pause();
    // }

    // stop(){
    //     this.sequencer.stop();
    //     this.props.updatePlayedStep(-1);
    // }

    // updateSamples(instrumentsById){
    //     let oldSamples = {...this.samples};
    //     let newSamples = {};
    //     let ids = Object.keys(instrumentsById);

    //     ids.forEach(instrumentId => {
    //         let instrument = instrumentsById[instrumentId];

    //         if(oldSamples[instrument.name]){
    //             newSamples[instrument.name] = oldSamples[instrument.name];
    //         }else{
    //             newSamples[instrument.name] = new Tone.Sampler(this.buffers[instrument.path]).toMaster();
    //         }

    //         delete oldSamples[instrument.name];
    //     });

    //     this.samples = newSamples;
    //     this.destroySamples(oldSamples);
    // }

    // destroySamples(samples){
    //     mapObject(samples, (key, sample) => {
    //         sample.dispose();
    //         delete samples[key];
    //     });
    // }

    // updateInstrumentsEffects(instrumentsEffects){
    //     let oldInstrumentsEffects = {...this.instrumentsEffects};
    //     let newInstrumentsEffects = {};

    //     mapObject(instrumentsEffects, (instrumentName, effectsSettings) => {
    //         let sample = this.samples[instrumentName];

    //         effectsSettings.forEach(effectSettings => {
    //             let instrumentEffects = oldInstrumentsEffects[instrumentName] || {};
    //             newInstrumentsEffects[instrumentName] = newInstrumentsEffects[instrumentName] || {};

    //             if(!instrumentEffects[effectSettings.id]){
    //                 let effect = newInstrumentsEffects[instrumentName][effectSettings.id] = createEffect(effectSettings);

    //                 this.samples[instrumentName].chain(effect, Tone.Master);
    //             }else{
    //                 applySettingsToEffect(effectSettings, instrumentEffects[effectSettings.id]);
    //                 newInstrumentsEffects[instrumentName][effectSettings.id] = instrumentEffects[effectSettings.id];
    //             }

    //             oldInstrumentsEffects[instrumentName] && delete oldInstrumentsEffects[instrumentName][effectSettings.id];
    //         });
    //     });

    //     this.instrumentsEffects = newInstrumentsEffects;
    //     this.destroyInstrumentsEffects(oldInstrumentsEffects);
    // }

    // destroyInstrumentsEffects(instrumentsEffects){
    //     mapObject(instrumentsEffects, (instrumentName, effects) => {
    //         mapObject(effects, (effectId, effect) => {
    //             effect.disconnect();
    //             effect.dispose();
    //             delete effects[effectId];
    //         });
    //     });
    // }

    // loadBuffers(samplesPaths){
    //     this.props.updateLoadingState(true);
    
    //     this.buffers = samplesPaths.reduce((result, samplePath) => {
    //         result[samplePath] = new Tone.Buffer(samplePath);
    //         return result;
    //     }, {});
    // }

    // updateMatrix(instrumentsById, instrumentsSteps){
    //     this.matrix = this.createMatrix(instrumentsById, instrumentsSteps);
    // }

    // createMatrix(instrumentsById, instrumentsSteps){
    //     let ids = Object.keys(instrumentsById);

    //     let matrix = ids.reduce((matrix, instrumentId) => {
    //         let instrument = instrumentsById[instrumentId];
    //         let steps = instrumentsSteps[instrumentId];

    //         steps.forEach((step, i) => {
    //             matrix[i] = matrix[i] || {};

    //             if((step === undefined) || !instrument.active) { return; }

    //             let {volume, path, name} = instrument;

    //             matrix[i][name] = {step, volume, path, name};
    //         });

    //         return matrix;
    //     }, []);

    //     if(!matrix.length){
    //         matrix = this.generateEmptyMatrix(this.props.stepsAmount);
    //     }

    //     return matrix;
    // }

    // generateEmptyMatrix(stepsAmount){
    //     let matrix = [];

    //     for(let i = 0; i < stepsAmount; i++){
    //         matrix.push({});
    //     }

    //     return matrix;
    // }

    // createSequencer(){
    //     this.sequencer = new Tone.Sequence((time, step) => {
    //         for(let key in step){
    //             let {note, path, volume, name} = step[key];
    //             let sample = this.samples[name];
    //             let processedVolume = volume / 100;

    //             sample.triggerAttackRelease(note, undefined, undefined, processedVolume);
    //         }
    
    //         let currentStepIndex = this.matrix.indexOf(step);
    //         this.props.updatePlayedStep(currentStepIndex);
    //     }, [], "16n");

    //     this.sequencer.loopStart = '0m';
    //     this.sequencer.loopEnd = '1m';
    // }

    // updateSequence(){
    //     if(!this.sequencer) { return; }

    //     this.sequencer.removeAll();

    //     this.matrix.forEach((item, i) => {
    //         this.sequencer.add(i, item);
    //     });
    // }

    // initializeInstruments(){
    //     let onLoad = () => {
    //         this.updateSamples(this.props.instrumentsById);
    //         this.updateInstrumentsEffects(this.props.instrumentsEffects);
    //         Tone.Buffer.off('load', onLoad);
    //     }

    //     Tone.Buffer.on('load', onLoad);
    // }
}

export default connect(mapStateToProps, {
    updatePlayedStep,
    updateLoadingState
})(SamplerManager);

function mapStateToProps(state){
    return {
        instrumentsById: state.instruments.byId,
        instrumentsEffects: state.instrumentsEffects,
        instrumentsSteps: state.instrumentsSteps,
        play: state.play,
        samples: state.samples,
        stepsAmount: state.stepsAmount,
    };
}