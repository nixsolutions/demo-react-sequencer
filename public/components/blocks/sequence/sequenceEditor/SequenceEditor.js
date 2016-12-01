import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Step from './step/Step';

class SequenceEditor extends Component {
    render() {
        let {instrument} = this.props; 
        let items = this.createSteps(instrument.notes);
        return <ul styleName="sequence-editor">{items}</ul>
    }

    createSteps(notes){
        return notes.map((note, i) => {
            let isEven = Math.floor(i / 4) % 2 !== 0;
            let isHighlighted = this.props.playedStep === i;
            return (
                <li key={i} onClick={this.onStepClick.bind(this, note, i, this.props.instrument)}>
                    <Step active={note !== undefined} 
                        isHighlighted={isHighlighted}
                        isEven={isEven}/>
                </li>
            );
        })
    }

    onStepClick(step, index, instrument){
        this.props.onToggleStep && this.props.onToggleStep(step, index, instrument);
    }
}

SequenceEditor.propTypes = {
    playedStep: PropTypes.number,
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            volume: PropTypes.number,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    onToggleStep: PropTypes.func
};

export default CSSModules(SequenceEditor, styles, {allowMultiple: true});