import { createSelector } from 'reselect';

export const makeDropdownItems = () => createSelector(
    samples => samples,
    samples => samples.map(item => ({ title: item.name, value: item })),
)