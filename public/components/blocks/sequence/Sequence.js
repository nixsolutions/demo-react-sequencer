import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceEditor from 'containers/SequenceEditor';
import InstrumentDashboard from 'containers/InstrumentDashboard';
import RemoveInstrumentButton from 'containers/RemoveInstrumentButton';

class Sequence extends Component {
    static propTypes = {
        instrumentId: PropTypes.string
    };

    render() {
        let {instrumentId, toggleStep} = this.props;

        let sequenceEditorProps = {
            instrumentId,
        };


        return (
            <div styleName="sequence">
                <div styleName="control-holder">
                    <InstrumentDashboard instrumentId={instrumentId} />
                </div>
                <div>
                    <SequenceEditor {...sequenceEditorProps}/>
                </div>
                <div styleName="remove-holder">
                    <RemoveInstrumentButton instrumentId={instrumentId}/>
                </div>
            </div>
        );
    }
};

export default CSSModules(Sequence, styles, {allowMultiple: true});