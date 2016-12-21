import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Controller from 'components/common/controller/Controller';
import Modal from 'components/common/modal/Modal';
import Effects from 'components/blocks/effects/Effects';
import InstrumentEffects from 'containers/instrumentEffects/InstrumentEffects';

class SequenceControl extends Component {
    state = {
        isConfirmationRemoveActive: false,
        isEffectsModalActive: false
    };

    render() {
        let {instrument} = this.props;
        let muteClass = ['mute', instrument.active ? 'active' : ''].join(' ');
        let muteText = instrument.active ? 'disable instrument' : 'enable instrument';

        let confirmationModalProps = {
            title: 'Are you sure ?',
            isOpen: this.state.isConfirmationRemoveActive,
            onRequestClose: this.closeRemoveConfirmation.bind(this),
            contentLabel: "modal",
            buttons: [
                { title: 'Yes', click: this.removeInstrument.bind(this)},
                { title: 'No', click: this.closeRemoveConfirmation.bind(this)}
            ]
        };

        let effectsModalProps = {
            title: `${instrument.name}'s effects`,
            isOpen: this.state.isEffectsModalActive,
            contentLabel: 'modal',
            onRequestClose: this.closeEffectsModal.bind(this)
        };

        let muteProps = {
            styleName: muteClass,
            title: muteText,
            onClick: this.props.toggleInstrument.bind(this, instrument)
        };

        let removeButtonProps = {
            styleName: "remove",
            onClick: this.onRemoveClick.bind(this, instrument)
        };

        let fxButtonProps = {
            onClick: this.onFxClick.bind(this, instrument),
            styleName: "fx-button"
        };

        let volumeControllerProps = {
            size: "34",
            value: instrument.volume,
            onChange: this.updateInstrumentVolume.bind(this, instrument)
        };
    
        return (
            <div styleName="sequence-control" ref="sequence-control">
                <div {...muteProps}></div>
                <div styleName="instrument-block">
                    <div styleName="name" title={instrument.name}>{instrument.name}</div>
                    <div styleName="controller">
                        <Controller {...volumeControllerProps} />
                    </div>
                    <div styleName="controller">
                        <span {...fxButtonProps}>FX</span>
                    </div>
                    <div {...removeButtonProps}>X</div>
                </div>
                <Modal {...confirmationModalProps}>
                    <div>"You want to delete an instrument ?"</div>
                </Modal>
                <Modal {...effectsModalProps}>
                    <InstrumentEffects instrumentName={instrument.name}/>
                </Modal>
            </div>
        );
    }

    removeInstrument(){
        this.props.removeInstrument(this.props.instrument);
    }

    openRemoveConfirmation(){
        this.setState({isConfirmationRemoveActive: true});
    }

    closeRemoveConfirmation(){
        this.setState({isConfirmationRemoveActive: false});
    }

    openEffectsModal(){
        this.setState({isEffectsModalActive: true});
    }

    closeEffectsModal(){
        this.setState({isEffectsModalActive: false});
    }

    onRemoveClick(instrument) {
        this.openRemoveConfirmation();
    }

    onFxClick(instrument) {
        this.openEffectsModal();
    }

    getCoords(elem) {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left,
            right: left + elem.clientWidth,
            bottom: top + elem.clientHeigth,
        };
    }

    updateInstrumentVolume(instrument, volume) {
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

export default CSSModules(SequenceControl, styles, { allowMultiple: true });