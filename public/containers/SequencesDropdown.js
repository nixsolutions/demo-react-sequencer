import React, {PureComponent} from 'react';
import Dropdown from 'components/common/dropdown/Dropdown';
import {connect} from 'react-redux';
import { addInstrument } from 'modules/instruments';
import {makeDropdownItems} from 'selectors';

export default connect(mapStateToProps, {
    onSelect: addInstrument
})(Dropdown);

function mapStateToProps() {
    const dropdownItems = makeDropdownItems();

    return (state) => ({
        title: "Add instrument",
        items: dropdownItems(state.samples)
    })
}