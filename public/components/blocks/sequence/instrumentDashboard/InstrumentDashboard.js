import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Modal from 'components/common/modal/Modal';
import Effects from 'components/blocks/effects/Effects';
import InstrumentEffects from 'containers/InstrumentEffects';
import MuteInstrumentButton from 'containers/MuteInstrumentButton';
import InstrumentVolumeController from 'containers/InstrumentVolumeController';

class InstrumentDashboard extends Component {
    static propTypes = {
        instrumentId: PropTypes.string,
        instrumentName: PropTypes.string,
    };

    constructor(props){
        super(props);

        this.closeEffectsModal = this.closeEffectsModal.bind(this);
        this.onFxClick = this.onFxClick.bind(this);
    }

    state = {isEffectsModalActive: false};

    render() {
        let {instrumentId, instrumentName} = this.props;

        let effectsModalProps = {
            title: `${instrumentName}'s effects`,
            isOpen: this.state.isEffectsModalActive,
            contentLabel: 'modal',
            onRequestClose: this.closeEffectsModal
        };

        let fxButtonProps = {
            onClick: this.onFxClick,
            styleName: ["fx-button", this.state.isEffectsModalActive ? 'active' : ''].join(' ')
        };
    
        return (
            <div styleName="sequence-control">
                <MuteInstrumentButton instrumentId={instrumentId} />
                <div styleName="instrument-block">
                    <div styleName="name" title={instrumentName}>{instrumentName}</div>
                    <InstrumentVolumeController instrumentId={instrumentId} />
                    <span {...fxButtonProps}></span>
                </div>
                <Modal {...effectsModalProps}>
                    <div styleName="instrument-effects">
                        <InstrumentEffects instrumentName={instrumentName} />
                    </div>
                </Modal>
            </div>
        );
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
}

export default CSSModules(InstrumentDashboard, styles, { allowMultiple: true });