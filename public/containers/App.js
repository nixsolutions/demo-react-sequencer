import 'shared/reset.less';
import React, { Component } from 'react';
import PlayButton from 'components/common/buttons/playButton/PlayButton';

export default class App extends Component {
  render() {
    return (
      <div>
        <PlayButton active={true}></PlayButton>
      </div>
    );
  }
}
