import 'shared/reset.less';
import React, { Component } from 'react';
import SoundManager from 'containers/SoundManager';
import Sampler from 'containers/Sampler';

export default class App extends Component {
  render() {
    return (
      <div>
        <Sampler/>
        <SoundManager/>
      </div>
    );
  }
}
