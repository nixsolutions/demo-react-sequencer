import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import SequencesManager from 'containers/sequencesManager/SequencesManager';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';
import Piano from 'components/blocks/piano/Piano';
import PanelControls from 'containers/panelControls/PanelControls';
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
            <Piano/>
          </DashboardBlock>
        </Dashboard>
        <SoundManager/>
        <Spinner active={this.props.loadingState}/>
      </div>
    );
  }
}

export default connect(state => ({loadingState: state.loadingState}))(App);
