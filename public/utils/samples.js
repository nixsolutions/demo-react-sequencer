import Tone from 'tone';

export default class Samples {
    buffer = new Tone.Buffer();
    loadedSamples = {};

    loadSample(path) {
        return new Promise((resolve, reject) => {
            if(this.loadedSamples[path]){
                return resolve(this.loadedSamples[path]);
            }

            this.buffer.load(path, buffer => {
                const sample = new Tone.Sampler(buffer).toMaster();

                this.loadedSamples[path] = sample;
                resolve(sample);
            }, reject);
        });
    }
}