import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {Component, PropTypes} from 'react';
import Octave from './octave/Octave';

class Piano extends Component {
    render() {
        return <div styleName="piano">
                    <Octave number={3} onKeyPress={note => console.log(note) }/>
                </div>
    }
};

export default CSSModules(Piano, styles);



