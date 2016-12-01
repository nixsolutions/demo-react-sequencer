import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import Sampler from 'containers/Sampler';
import DashBoard from 'components/dashboard/DashBoard.js';
import DashBoardBlock from 'components/dashboardBlock/DashBoardBlock.js';

export default class App extends Component {
  render() {
    return (
      <DashBoard>
        <DashBoardBlock>

        </DashBoardBlock>

         <DashBoardBlock>
          <Sampler/>
          <SoundManager/>
        </DashBoardBlock>
        <DashBoardBlock>
          
        </DashBoardBlock>
      </DashBoard>
    );
  }
}
