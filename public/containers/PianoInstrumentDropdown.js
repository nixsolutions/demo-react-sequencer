import React, {Component} from 'react';
import Dropdown from 'components/common/dropdown/Dropdown';
import {connect} from 'react-redux';
import {updateAccompanimentInstrument} from 'modules/accompanimentInstrument';

export default connect(mapStateToProps, {
    onSelect: updateAccompanimentInstrument
})(Dropdown);

function mapStateToProps(state) {
    return {
        styleMode: 'style2',
        items: samplesToDropdownItems(state.samples),
        title: state.accompanimentInstrument.name || 'Select instrument'
    };
}

function samplesToDropdownItems(samples) {
    return samples.map(item => ({title: item.name, value: item}));
}