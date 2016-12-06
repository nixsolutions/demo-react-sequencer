import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {Component, PropTypes} from 'react';

class Octave extends Component {
    render() {
        let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        let keys = notes.map(note => {
            let isSemitone = note.indexOf('#') !== -1;
            let cssClass = ['note', isSemitone ? 'semitone' : ''].join(' ');
            let value = `${note}${this.props.number}`;

            return <li key={note} styleName={cssClass} onClick={this.onKeyClick.bind(this, value)}></li>  
        });

        return <ul styleName="octave">{keys}</ul>
    }

    onKeyClick(e, note){
        this.props.onKeyPress && this.props.onKeyPress(note);
    }
};

Octave.propTypes = {
    number: PropTypes.number,
    onKeyPress: PropTypes.func,
}

export default CSSModules(Octave, styles, {allowMultiple: true});