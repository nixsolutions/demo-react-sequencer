import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import {
    OCTAVE_NOTES
} from 'utils/notes';

class Octave extends Component {
    render() {
        let keys = OCTAVE_NOTES.map((note, i) => {
            let value = `${note}${this.props.number}`;
            let isSemitone = note.indexOf('#') !== -1;
            let semitoneClass = isSemitone ? 'semitone' : '';
            let activeClass = this.props.styles['active'];
            let cssClass = ['note', semitoneClass].join(' ');

            let onMouseDown = (e) => {
                let el = this.refs[value];
                
                el.classList.add(activeClass);
                this.onMouseDown(value, e);
            };

            let onMouseUp = (e) => {
                let el = this.refs[value];
               
                el.classList.remove(activeClass);
                this.onMouseUp(value, e);
            };

            this.props.bindToKey({
                keyCode: this.props.keys[i],
                down: onMouseDown,
                up: onMouseUp,
            });

            return <li key={note} 
                    styleName={cssClass} 
                    onMouseDown={onMouseDown} 
                    onMouseUp={onMouseUp}
                    ref={value}></li>  
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