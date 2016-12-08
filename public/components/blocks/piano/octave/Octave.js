import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import {
    OCTAVE_NOTES
} from 'utils/notes';

class Octave extends Component {
    componentWillMount(){
        this.bindKeys();
    }

    render() {
        this.activeClass = this.props.styles['active'];

        let noteValues = this.getNoteValues();

        let keys = noteValues.map((noteValue, i) => {
            let isSemitone = noteValue.indexOf('#') !== -1;
            let semitoneClass = isSemitone ? 'semitone' : '';
            let cssClass = ['note', semitoneClass].join(' ');
            let {onMouseDown, onMouseUp} = this.getHandlers(noteValue);

            return <li key={noteValue} 
                    styleName={cssClass} 
                    onMouseDown={onMouseDown} 
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    ref={noteValue}></li>  
        });

        return <ul styleName="octave">{keys}</ul>
    }

    getNoteValue(note, octaveIndex){
        return `${note}${octaveIndex}`;
    }

    getNoteValues(){
        return OCTAVE_NOTES.map(note => this.getNoteValue(note, this.props.number));
    }

    getHandlers(noteValue){
        let onMouseDown = (e) => {
            let el = this.refs[noteValue];
            
            el.classList.add(this.activeClass);
            this.onMouseDown(noteValue, e);
        };

        let onMouseUp = (e) => {
            let el = this.refs[noteValue];
            
            el.classList.remove(this.activeClass);
            this.onMouseUp(noteValue, e);
        };

        return {onMouseDown, onMouseUp};
    }

    bindKeys(){
        let noteValues = this.getNoteValues();

        noteValues.forEach(this.bindKey.bind(this));
    }

    bindKey(noteValue, noteIndex){
        let {onMouseDown, onMouseUp} = this.getHandlers(noteValue);

        this.props.bindToKey({
            keyCode: this.props.keys[noteIndex],
            down: onMouseDown,
            up: onMouseUp,
        });
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