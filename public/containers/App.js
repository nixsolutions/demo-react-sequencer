import 'shared/reset.less';
import 'shared/layouts.less';
import React, { Component } from 'react';
import PlayButton from 'components/common/buttons/playButton/PlayButton';
import PauseButton from 'components/common/buttons/pauseButton/PauseButton';
import StopButton from 'components/common/buttons/stopButton/StopButton';

export default class App extends Component {
  render() {
    return (
      <div>
         <PlayButton active={true}></PlayButton>
         <PauseButton active={true}></PauseButton>
         <StopButton active={true}></StopButton>
      </div>
    );
  }
}
