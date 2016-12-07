import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import {
    OCTAVE_NOTES
} from 'utils/notes';

class Octave extends Component {
    render() {
        let keys = OCTAVE_NOTES.map((note, i) => {
            let isSemitone = note.indexOf('#') !== -1;
            let cssClass = ['note', isSemitone ? 'semitone' : ''].join(' ');
            let value = `${note}${this.props.number}`;
console.log(this.props.keys)
            this.props.bindToKey({
                keyCode: this.props.keys[i],
                down: this.onMouseDown.bind(this, value),
                up: this.onMouseUp.bind(this, value),
            });

            return <li key={note} 
                    styleName={cssClass} 
                    onMouseDown={this.onMouseDown.bind(this, value)} 
                    onMouseUp={this.onMouseUp.bind(this, value)}></li>  
        });

        return <ul styleName="octave">{keys}</ul>
    }

    onMouseDown(note, e){
        this.props.onKeyDown && this.props.onKeyDown(note);
    }

    onMouseUp(note, e){
        this.props.onKeyUp && this.props.onKeyUp(note);
    }
};

Octave.propTypes = {
    number: PropTypes.number,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    bindToKey: PropTypes.func,
    keys: PropTypes.array,
}

export default CSSModules(Octave, styles, {allowMultiple: true});