import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Controller from 'components/common/controller/Controller';

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
                <div styleName="controller">
                    <Controller size="25" value={instrument.volume} onChange={this.updateInstrumentVolume.bind(this, instrument)}/>
                </div>
                <div styleName="remove" 
                    onClick={this.props.removeInstrument.bind(this, instrument)}>X</div>
            </div>
        );
    }

    updateInstrumentVolume(instrument, volume){
        this.props.updateInstrumentVolume(instrument, volume);
    }
}

SequenceControl.propTypes = {
    instrument: PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
        active: PropTypes.bool,
        notes: PropTypes.array
    }),
    toggleInstrument: PropTypes.func,
    removeInstrument: PropTypes.func,
    updateInstrumentVolume: PropTypes.func,
};

export default CSSModules(SequenceControl, styles, {allowMultiple: true});