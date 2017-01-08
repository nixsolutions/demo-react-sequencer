import React, {Component} from 'react';
import Dropdown from 'components/common/dropdown/Dropdown';
import {connect} from 'react-redux';
import {updateAccompanimentInstrument} from 'modules/accompanimentInstrument';
import {makeDropdownItems} from 'selectors';

export default connect(mapStateToProps, {
    onSelect: updateAccompanimentInstrument
})(Dropdown);

function mapStateToProps() {
    const dropdownItems = makeDropdownItems();

    return (state) => ({
        styleMode: 'style2',
        items: dropdownItems(state),
        title: state.accompanimentInstrument.name || 'Select instrument'
    })
}