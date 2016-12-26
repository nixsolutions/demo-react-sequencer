import React, {Component} from 'react';
import RemoveButton from 'components/blocks/sequence/removeButton/RemoveButton';
import {connect} from 'react-redux';
import {removeInstrument} from 'modules/instruments';

export default connect(undefined, {
    removeInstrument
})(RemoveButton);