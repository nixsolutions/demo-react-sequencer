import Tone from 'tone';
import {mapObject} from 'utils/helper';
import {createEffect, applySettingsToEffect} from 'utils/effects';
import {EventEmitter} from 'events';

export default class Sampler extends EventEmitter{
    events = ['played-step.updated', 'loading']; 
    sequencer = null;
    matrix = [];
    samples = {};
    buffers = {};
    instrumentsEffects = {};
    stepsAmount = null;

    init(samplesPaths, stepsAmount){
        this.stepsAmount = stepsAmount;

        return this.loadBuffers(samplesPaths)
            .then(this.createSequencer.bind(this));
    }

    play(){
        Tone.Transport.start();
        this.sequencer.start();
    }

    pause(){
        Tone.Transport.pause();
    }

    stop(){
        this.sequencer.stop();
        this.emit('played-step.updated', -1)
    }

    updateSamples(instruments){
        this.instruments = instruments || this.instruments;

        let oldSamples = {...this.samples};
        let newSamples = {};
        let ids = Object.keys(this.instruments);

        ids.forEach(instrumentId => {
            let instrument = this.instruments[instrumentId];

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
        this.emit('loading', true);

        let promises = samplesPaths.map(samplePath => new Promise((resolve, reject) => {
            new Tone.Buffer(samplePath, sample => {
                this.buffers[samplePath] = sample;
                resolve(sample);
            });
        }));

        return Promise.all(promises);
    }

    updateMatrix(instruments = [], instrumentsSteps = {}){
        this.instruments = instruments;
        this.instrumentsSteps = instrumentsSteps;

        this.matrix = this.createMatrix(this.instruments, this.instrumentsSteps);
    }

    createMatrix(instrumentsById, instrumentsSteps){
        let ids = Object.keys(instrumentsById);

        let matrix = ids.reduce((matrix, instrumentId) => {
            let instrument = instrumentsById[instrumentId];
            let steps = instrumentsSteps[instrumentId];

            steps.forEach((step, i) => {
                matrix[i] = matrix[i] || {};

                if((step === undefined) || !instrument.active) { return; }

                let {volume, path, name} = instrument;

                matrix[i][name] = {step, volume, path, name};
            });

            return matrix;
        }, []);

        if(!matrix.length){
            matrix = this.generateEmptyMatrix(this.stepsAmount);
        }

        return matrix;
    }

    generateEmptyMatrix(stepsAmount){
        let matrix = [];

        for(let i = 0; i < stepsAmount; i++){
            matrix.push({});
        }

        return matrix;
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

            this.emit('played-step.updated', currentStepIndex);
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