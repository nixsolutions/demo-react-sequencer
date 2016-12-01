import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import Sampler from 'containers/Sampler';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';

export default class App extends Component {
  render() {
    return (
      <Dashboard>
        <DashboardBlock>

        </DashboardBlock>

         <DashboardBlock>
          <Sampler/>
          <SoundManager/>
        </DashboardBlock>
        <DashboardBlock>
          
        </DashboardBlock>
      </Dashboard>
    );
  }
}
