import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Step from './step/Step';

class SequenceEditor extends Component {
    static propTypes = {
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

    constructor(props){
        super(props);

        this.onStepClick = this.onStepClick.bind(this);
    }

    render() {
        let {instrument} = this.props; 
        let items = this.createSteps(instrument.notes);
        return <ul styleName="sequence-editor">{items}</ul>
    }

    createSteps(notes){
        return notes.map((note, i) => {
            let isEven = Math.floor(i / 4) % 2 !== 0;
            let isHighlighted = this.props.playedStep === i;
            let stepProps = {
                active: (note !== undefined),
                isHighlighted,
                isEven,
                index: i,
                note,
                onStepClick: this.onStepClick
            };

            return (
                <li key={i}>
                    <Step {...stepProps}/>
                </li>
            );
        })
    }

    onStepClick(note, stepIndex){
        this.props.onToggleStep &&
        this.props.onToggleStep(note, stepIndex, this.props.instrument);
    }
}

export default CSSModules(SequenceEditor, styles, {allowMultiple: true});