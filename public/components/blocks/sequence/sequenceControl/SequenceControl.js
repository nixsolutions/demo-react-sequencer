import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Controller from 'components/common/controller/Controller';
import Modal from 'components/common/modal/Modal';
import Effects from 'components/blocks/effects/Effects';
import InstrumentEffects from 'containers/instrumentEffects/InstrumentEffects';

class SequenceControl extends Component {
    static propTypes = {
        instrument: PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        }),
        toggleInstrument: PropTypes.func,
        updateInstrumentVolume: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.closeEffectsModal = this.closeEffectsModal.bind(this);
        this.toggleInstrument = this.toggleInstrument.bind(this);
        this.onFxClick = this.onFxClick.bind(this);
        this.updateInstrumentVolume = this.updateInstrumentVolume.bind(this);
    }

    state = {isEffectsModalActive: false};

    render() {
        let {instrument} = this.props;
        let muteClass = ['mute', instrument.active ? 'active' : ''].join(' ');
        let muteText = instrument.active ? 'disable instrument' : 'enable instrument';

        let effectsModalProps = {
            title: `${instrument.name}'s effects`,
            isOpen: this.state.isEffectsModalActive,
            contentLabel: 'modal',
            onRequestClose: this.closeEffectsModal
        };

        let muteProps = {
            styleName: muteClass,
            title: muteText,
            onClick: this.toggleInstrument
        };

        let fxButtonProps = {
            onClick: this.onFxClick,
            styleName: ["fx-button", this.state.isEffectsModalActive ? 'active' : ''].join(' ')
        };

        let volumeControllerProps = {
            size: 34,
            value: instrument.volume,
            onChange: this.updateInstrumentVolume
        };
    
        return (
            <div styleName="sequence-control" ref="sequence-control">
                <div {...muteProps}></div>
                <div styleName="instrument-block">
                    <div styleName="name" title={instrument.name}>{instrument.name}</div>
                    <Controller {...volumeControllerProps} />
                    <span {...fxButtonProps}></span>
                </div>
                <Modal {...effectsModalProps}>
                    <InstrumentEffects instrumentName={instrument.name}/>
                </Modal>
            </div>
        );
    }

    toggleInstrument(){
        this.props.toggleInstrument(this.props.instrument);
    }

    openEffectsModal(){
        this.setState({isEffectsModalActive: true});
    }

    closeEffectsModal(){
        this.setState({isEffectsModalActive: false});
    }

    onFxClick() {
        this.openEffectsModal();
    }

    updateInstrumentVolume(volume) {
        this.props.updateInstrumentVolume(this.props.instrument, volume);
    }
}

export default CSSModules(SequenceControl, styles, { allowMultiple: true });