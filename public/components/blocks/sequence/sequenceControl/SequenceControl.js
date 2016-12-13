import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Controller from 'components/common/controller/Controller';
import Popup from 'components/common/popup/Popup';

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
                <div styleName="instrument-block">
                    <div styleName="name" title={instrument.name}>{instrument.name}</div>
                    <div styleName="controller">
                        <Controller size="25" value={instrument.volume} onChange={this.updateInstrumentVolume.bind(this, instrument)}/>
                    </div>
                    <div styleName="controller">
                        <span onClick={this.onFxClick.bind(this, instrument)} styleName="fx-button">FX</span>
                    </div>
                    <div styleName="remove" 
                        onClick={this.onRemoveClick.bind(this, instrument)}>X</div>
                </div>
            </div>
        );
    }

    onRemoveClick(instrument){
        let {removeInstrument} = this.props;

        Popup.show({
            title: 'Are you sure ?',
            content: "You want to delete an instrument ?",
            buttons: [
                {
                    title: 'Yes',
                    click: function() {
                        removeInstrument(instrument);
                        this.onClose();
                    }
                },
                {
                    title: 'No',
                    click: function(){
                        this.onClose();
                    }
                }
            ]
        });
    }

    onFxClick(instrument){
        let {removeInstrument} = this.props;

        Popup.show({
            title: `${instrument.name}'s effects`,
            content: <a>sdfsdfsd</a>
        });
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