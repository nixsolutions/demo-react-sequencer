import { createSelector } from 'reselect';

export const pianoVolume = state => state.pianoVolume;
export const samples = state => state.samples;
export const bpmSelector = state => state.bpm;
export const instrumentsSelector = state => state.instruments.byId;
export const instrumentsStepsSelector = state => state.instrumentsSteps;
export const stepsAmountSelector = state => state.stepsAmount;
export const initialSamplesSelector = state => state.samples.slice(0, 3);
export const instrumentsEffectsSelector = state => state.instrumentsEffects;
export const samplesPathsSelector = state => state.samples.map(sample => sample.path);

export const makeDropdownItems = () => createSelector(
    samples,
    samples => samples.map(item => ({ title: item.name, value: item })),
);
