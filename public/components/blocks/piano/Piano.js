import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {PureComponent, PropTypes} from 'react';
import Octave from './octave/Octave';
import {
    OCTAVE_NOTES
} from 'utils/notes';
import {PIANO_KEYS} from 'utils/keys';

class Piano extends PureComponent {
    static propTypes = {
        playedNotes: PropTypes.array,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        bindToKey: PropTypes.func,
    };

    render() {
        const OCTAVES = [2, 3, 4];

        let items = OCTAVES.map((octave, i) => {
            let skip = i * OCTAVE_NOTES.length;
            let to = skip + OCTAVE_NOTES.length;
            let keys = PIANO_KEYS.slice(skip, to);

            let octaveProps = {
                number: octave,
                playedNotes: this.props.playedNotes,
                onKeyDown: this.props.onKeyDown,
                onKeyUp: this.props.onKeyUp,
                bindToKey: this.props.bindToKey,
                keys
            };

            return (
                <li key={octave}>
                    <Octave {...octaveProps}/>
                </li>
            );
        });

        return <div styleName="piano">
                <ul styleName="octaves">{items}</ul>
            </div>
    }
}

export default CSSModules(Piano, styles);



