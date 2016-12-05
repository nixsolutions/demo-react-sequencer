import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import SequencesManager from 'containers/sequencesManager/SequencesManager';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';
import PanelControls from 'containers/PanelControls';

export default class App extends Component {
  render() {
    return (
      <div>
        <Dashboard>
          <DashboardBlock>
            <PanelControls />
          </DashboardBlock>
          <DashboardBlock>
            <SequencesManager />
          </DashboardBlock>
          <DashboardBlock>
          </DashboardBlock>
        </Dashboard>
        <SoundManager/>
      </div>
    );
  }
}
