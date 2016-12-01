import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceEditor from './sequenceEditor/SequenceEditor';
import SequenceControl from './sequenceControl/SequenceControl';

class Sequence extends Component {
    render() {
        let {instrument, playedStep, toggleStep} = this.props;
        return <div styleName="sequence">
            <div styleName="control-holder">
                <SequenceControl instrument={instrument} 
                            toggleInstrument={this.props.toggleInstrument}
                            updateInstrumentVolume={this.props.updateInstrumentVolume}
                            removeInstrument={this.props.removeInstrument}/>
            </div>
            <div>
                <SequenceEditor instrument={instrument}
                    playedStep={playedStep}
                    onToggleStep={toggleStep}/>
            </div>
        </div>;
    }
}

Sequence.propTypes = {
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            volume: PropTypes.number,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    playedStep: PropTypes.number,
    toggleStep: PropTypes.func,
    toggleInstrument: PropTypes.func,
    removeInstrument: PropTypes.func,
    updateInstrumentVolume: PropTypes.func,
};

export default CSSModules(Sequence, styles, {allowMultiple: true});