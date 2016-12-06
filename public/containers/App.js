import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';
import PanelControls from 'containers/PanelControls';
import SequencesManager from 'containers/SequencesManager';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

export default class App extends Component {
  render() {
    return (
      <div>
        <Dashboard>
          <DashboardBlock>
            <PanelControls />
          </DashboardBlock>
          <DashboardBlock>
            <ScrollableBlock>
              <SequencesManager />
              <SequencesManager />
              <SequencesManager />
              <SequencesManager />
            </ScrollableBlock>
          </DashboardBlock>
          <DashboardBlock>
          </DashboardBlock>
        </Dashboard>
        <SoundManager/>
      </div>
    );
  }
}
