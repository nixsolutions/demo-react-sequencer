import { createSelector } from 'reselect';

export const pianoVolume = state => state.pianoVolume;
export const samples = state => state.samples;
export const instrumentsSelector = state => state.instruments.byId;
export const instrumentsStepsSelector = state => state.instrumentsSteps;
export const samplesPathsSelector = state => state.samples.map(sample => sample.path);

export const makeDropdownItems = () => createSelector(
    samples,
    samples => samples.map(item => ({ title: item.name, value: item })),
);
