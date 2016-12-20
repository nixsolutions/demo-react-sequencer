import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import PlayButton from 'components/common/buttons/playButton/PlayButton';
import PauseButton from 'components/common/buttons/pauseButton/PauseButton';
import StopButton from 'components/common/buttons/stopButton/StopButton';
import { SPACE_KEY } from 'utils/keys';

class PlayControls extends Component {
    componentWillMount() {
        this.bindPlay();
    }

    render() {
        let playButtonProps = {
            active: (this.props.playState === 'play'),
            onClick: this.props.updatePlay
        }

        let pauseButtonProps = {
            active: (this.props.playState === 'pause'),
            onClick: this.props.updatePlay
        }

        let stopButtonProps = {
            active: (this.props.playState === 'stop'),
            disabled: (this.props.playState === 'stop'),
            onClick: this.props.updatePlay
        }

        return (
            <ul styleName="play-controls">
                <li><PlayButton {...playButtonProps} /></li>
                <li><PauseButton {...pauseButtonProps} /></li>
                <li><StopButton {...stopButtonProps} /></li>
            </ul>
        )
    }

    bindPlay() {
        let onMouseDown = (e) => {
            let value = (this.props.playState === 'play') ? 'pause' : 'play';

            this.props.updatePlay(value);
        };

        this.props.bindToKey({
            keyCode: SPACE_KEY,
            down: onMouseDown
        });
    }
};

PlayControls.propTypes = {
    playState: PropTypes.string,
    updatePlay: PropTypes.func,
    bindToKey: PropTypes.func,
}

export default CSSModules(PlayControls, styles, { allowMultiple: true });



