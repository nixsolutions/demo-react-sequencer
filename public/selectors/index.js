import { createSelector } from 'reselect';

export const pianoVolume = state => state.pianoVolume;
export const samples = state => state.samples;

export const makeDropdownItems = () => createSelector(
    samples,
    samples => samples.map(item => ({ title: item.name, value: item })),
);
