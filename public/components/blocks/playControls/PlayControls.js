import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import PlayButton from 'components/common/buttons/playButton/PlayButton';
import PauseButton from 'components/common/buttons/pauseButton/PauseButton';
import StopButton from 'components/common/buttons/stopButton/StopButton';

class PlayControls extends Component {
    render() {
        return (
            <div>
                <PlayButton active={this.props.playState === 'play'}
                            disabled={this.props.playState === 'play'}
                            onClick={this.props.updatePlay}></PlayButton>
                <PauseButton active={this.props.playState === 'pause'}
                            onClick={this.props.updatePlay}></PauseButton>
                <StopButton active={this.props.playState === 'stop'}
                            disabled={this.props.playState === 'stop'}
                            onClick={this.props.updatePlay}></StopButton>
            </div>
        )
    }
};

export default CSSModules(PlayControls, styles, {allowMultiple: true});



