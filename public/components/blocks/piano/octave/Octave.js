import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';
import {
    OCTAVE_NOTES
} from 'utils/notes';

class Octave extends PureComponent {
    static propTypes = {
        number: PropTypes.number,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        bindToKey: PropTypes.func,
        keys: PropTypes.array,
        playedNotes: PropTypes.array,
    };

    componentWillMount(){
        this.bindKeys();
    }

    render() {
        let noteValues = this.getNoteValues();
        let additionalClasses = ['', 'left', '', 'right', '', '', 'left', '', 'center', '', 'right', '', ''];

        let keys = noteValues.map((noteValue, i) => {
            let isSemitone = noteValue.indexOf('#') !== -1;
            let isActive = this.props.playedNotes.indexOf(noteValue) !== -1;
            let activeClass = isActive ? 'active' : '';
            let semitoneClass = isSemitone ? 'semitone' : '';
            let cssClass = ['note', semitoneClass, additionalClasses[i], activeClass].join(' ');
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
        let onMouseDown = (e) => this.onMouseDown(noteValue);
        let onMouseUp = (e) => this.onMouseUp(noteValue);

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

    onMouseDown(note){
        this.props.onKeyDown(note);
    }

    onMouseUp(note){
        let isActivatedNote = (this.props.playedNotes.indexOf(note) !== -1);

        if(!isActivatedNote){ return; }

        this.props.onKeyUp(note);
    }
};

export default CSSModules(Octave, styles, {allowMultiple: true});