import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceEditor from './sequenceEditor/SequenceEditor';
import SequenceControl from './sequenceControl/SequenceControl';

class Sequence extends Component {
    render() {
        let {instrument, playedStep, toggleStep} = this.props;
        return <div styleName="sequence">
            <SequenceControl instrument={instrument} toggleInstrument={this.props.toggleInstrument}/>
            <SequenceEditor instrument={instrument}
                    playedStep={playedStep}
                    onToggleStep={toggleStep}/>
        </div>;
    }
}

Sequence.propTypes = {
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    playedStep: PropTypes.number,
    toggleStep: PropTypes.func,
    toggleInstrument: PropTypes.func,
};

export default CSSModules(Sequence, styles, {allowMultiple: true});