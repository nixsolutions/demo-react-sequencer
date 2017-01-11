import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import ControlButton from './controlButton/ControlButton';
import { SPACE_KEY } from 'utils/keys';

class PlayControls extends Component {
    constructor(props){
        super(props);

        this.onPlayClick = this.onPlayClick.bind(this);
        this.onPauseClick = this.onPauseClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
    }
    componentWillMount() {
        this.bindPlay();
    }

    render() {
        const { playState } = this.props;

        let playButtonProps = {
            type: 'play',
            active: (playState === 'play'),
            onClick: this.onPlayClick
        }

        let pauseButtonProps = {
            type: 'pause',
            active: (playState === 'pause'),
            onClick: this.onPauseClick
        }

        let stopButtonProps = {
            type: 'stop',
            active: (playState === 'stop'),
            disabled: (playState === 'stop'),
            onClick: this.onStopClick
        }

        return (
            <ul styleName="play-controls">
                <li><ControlButton {...playButtonProps} /></li>
                <li><ControlButton {...pauseButtonProps} /></li>
                <li><ControlButton {...stopButtonProps} /></li>
            </ul>
        )
    }

    onPlayClick() {
        const { playState, updatePlay } = this.props;
        const value = playState === 'play' ? 'pause' : 'play';

        updatePlay(value);
    }

    onPauseClick() {
        const { playState, updatePlay } = this.props;
        const value = playState === 'pause' ? 'play' : 'pause';

        updatePlay(value);
    }

    onStopClick() {
        const { playState, updatePlay } = this.props;
        const value = playState === 'stop' ? 'play' : 'stop';

        updatePlay(value);
    }

    bindPlay() {
        let onMouseDown = (e) => {
            e.preventDefault();
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



