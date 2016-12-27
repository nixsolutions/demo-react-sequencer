import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceStep from 'containers/SequenceStep';

class SequenceEditor extends Component {
    static propTypes = {
        instrumentId: PropTypes.string,
        steps: PropTypes.array,
    };

    render() {
        let {steps} = this.props; 
        let items = this.createSteps(steps);

        return <ul styleName="sequence-editor">{items}</ul>
    }

    createSteps(steps){
        let {instrumentId} = this.props;

        return steps.map((step, i) => {
            let stepProps = {
                instrumentId,
                indexInSequence: i
            };

            return (
                <li key={i}>
                    <SequenceStep {...stepProps} />
                </li>
            );
        })
    }
}

export default CSSModules(SequenceEditor, styles, {allowMultiple: true});