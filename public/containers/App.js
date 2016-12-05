import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import SequencesManager from 'containers/sequencesManager/SequencesManager';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';

export default class App extends Component {
  render() {
    return (
      <div>
        <Dashboard>
          <DashboardBlock>
          </DashboardBlock>
          <DashboardBlock>
            <SequencesManager/>
          </DashboardBlock>
          <DashboardBlock>
            
          </DashboardBlock>
        </Dashboard>
        <SoundManager/>
      </div>
    );
  }
}
