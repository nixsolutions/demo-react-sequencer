import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {Component, PropTypes} from 'react';
import Octave from './octave/Octave';

class Piano extends Component {
    render() {
        const OCTAVES = [2, 3, 4];
        let items = OCTAVES.map(octave => {
            return <li key={octave}>
                    <Octave number={octave} 
                        onKeyDown={this.props.onKeyDown} 
                        onKeyUp={this.props.onKeyUp}/>
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
}

export default CSSModules(Piano, styles);



