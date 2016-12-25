import React, {Component} from 'react';
import Dropdown from 'components/common/dropdown/Dropdown';
import {connect} from 'react-redux';
import { addInstrument } from 'modules/instruments';

export default connect(mapStateToProps, {
    onSelect: addInstrument
})(Dropdown);

function mapStateToProps(state) {
    return {
        title: "Add instrument",
        items: samplesToDropdownItems(state.samples)
    };
}

function samplesToDropdownItems(samples){
    return samples.map(item => ({title: item.name, value: item}));
}