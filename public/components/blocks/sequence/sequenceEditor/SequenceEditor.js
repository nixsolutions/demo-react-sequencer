import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceStep from 'containers/SequenceStep';

class SequenceEditor extends Component {
    static propTypes = {
        instrumentId: PropTypes.string,
        stepsAmount: PropTypes.number,
    };

    render() { 
        let items = this.createSteps();

        return <ul styleName="sequence-editor">{items}</ul>
    }

    createSteps(){
        let {instrumentId, stepsAmount} = this.props;
        let steps = [];

        for(let i = 0; i < stepsAmount; i++){
            let stepProps = {
                instrumentId,
                indexInSequence: i
            };

            steps.push(
                <li key={i}>
                    <SequenceStep {...stepProps} />
                </li>
            );
        }

        return steps;
    }
}

export default CSSModules(SequenceEditor, styles, {allowMultiple: true});