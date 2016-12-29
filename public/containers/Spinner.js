import React, { Component } from 'react';
import Spinner from 'components/common/spinner/Spinner';
import {connect} from 'react-redux';

export default connect(state => ({active: state.loadingState}))(Spinner);
