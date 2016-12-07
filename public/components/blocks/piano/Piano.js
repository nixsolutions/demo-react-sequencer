import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {Component, PropTypes} from 'react';
import Octave from './octave/Octave';
import {
    OCTAVE_NOTES
} from 'utils/notes';
import {PIANO_KEYS} from 'utils/keys';

class Piano extends Component {
    render() {
        const OCTAVES = [2, 3, 4];

        let items = OCTAVES.map((octave, i) => {
            let skip = i * OCTAVE_NOTES.length;
            let to = skip + OCTAVE_NOTES.length;
            let keys = PIANO_KEYS.slice(skip, to);
    
            return <li key={octave}>
                    <Octave number={octave} 
                        onKeyDown={this.props.onKeyDown}
                        onKeyUp={this.props.onKeyUp}
                        bindToKey={this.props.bindToKey}
                        keys={keys}/>
                    </li>
        });

        return <div styleName="piano">
                <ul styleName="octaves">{items}</ul>
            </div>
    }
};

Piano.propTypes = {
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    bindToKey: PropTypes.func,
}

export default CSSModules(Piano, styles);



