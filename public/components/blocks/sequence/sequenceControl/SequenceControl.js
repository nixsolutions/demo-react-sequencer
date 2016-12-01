import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class SequenceControl extends Component {
    render() {
        let {instrument} = this.props;
        let muteClass = ['mute', instrument.active ? 'active' : ''].join(' ');
        let muteText = instrument.active ? 'disable instrument' : 'enable instrument';

        return (
            <div styleName="sequence-control">
                <div styleName={muteClass} 
                    title={muteText} 
                    onClick={this.props.toggleInstrument.bind(this, instrument)}></div>
                <div styleName="name">{instrument.name}</div>
            </div>
        );
    }
}

SequenceControl.propTypes = {
    instrument: PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
        active: PropTypes.bool,
        notes: PropTypes.array
    }),
    toggleInstrument: PropTypes.func
};

export default CSSModules(SequenceControl, styles, {allowMultiple: true});