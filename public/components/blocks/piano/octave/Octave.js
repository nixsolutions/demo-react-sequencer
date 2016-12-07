import CSSModules from 'react-css-modules';
import styles from './styles.less';
import {
    OCTAVE_NOTES,
    noteToPitch
} from 'utils/notes';

import React, {Component, PropTypes} from 'react';
import Tone from 'tone';

class Octave extends Component {
    componentWillMount(){
        this.sample = new Tone.Sampler('./samples/piano.wav').toMaster();
    }

    render() {
        let keys = OCTAVE_NOTES.map(note => {
            let isSemitone = note.indexOf('#') !== -1;
            let cssClass = ['note', isSemitone ? 'semitone' : ''].join(' ');
            let value = `${note}${this.props.number}`;

            return <li key={note} styleName={cssClass} onMouseDown={this.onKeyClick.bind(this, value)}></li>  
        });

        return <ul styleName="octave">{keys}</ul>
    }

    onKeyClick(note, e){
        let pitch = noteToPitch(note);

        this.sample.triggerAttackRelease(pitch);

        this.props.onKeyPress && this.props.onKeyPress(note);
    }
};

Octave.propTypes = {
    number: PropTypes.number,
    onKeyPress: PropTypes.func,
}

export default CSSModules(Octave, styles, {allowMultiple: true});