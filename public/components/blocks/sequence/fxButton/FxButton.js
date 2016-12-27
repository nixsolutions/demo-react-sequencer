import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

import Modal from 'components/common/modal/Modal';
import InstrumentEffects from 'containers/InstrumentEffects';

class FxButton extends Component {
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
        let {instrumentName, instrumentId} = this.props;

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
            <div>
                <span {...fxButtonProps}></span>
                <Modal {...effectsModalProps}>
                    <div styleName="instrument-effects">
                        <InstrumentEffects instrumentName={instrumentName} instrumentId={instrumentId} />
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

export default CSSModules(FxButton, styles, { allowMultiple: true });