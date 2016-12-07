import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';
import SamplerManager from 'containers/SamplerManager';
import Accompaniment from 'containers/accompaniment/Accompaniment';
import SequencesManager from 'containers/sequencesManager/SequencesManager';
import PanelControls from 'containers/panelControls/PanelControls';
import KeyboardNavigation from 'containers/KeyboardNavigation';
import Spinner from 'components/common/spinner/Spinner';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <Dashboard>
          <DashboardBlock>
            <PanelControls/>
          </DashboardBlock>
          <DashboardBlock>
            <SequencesManager/>
          </DashboardBlock>
          <DashboardBlock>
            <Accompaniment/>
          </DashboardBlock>
        </Dashboard>
        <SamplerManager/>
        <KeyboardNavigation/>
        <Spinner active={this.props.loadingState}/>
      </div>
    );
  }
}

export default connect(state => ({loadingState: state.loadingState}))(App);
