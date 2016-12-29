import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Modal from 'components/common/modal/Modal';

class RemoveButton extends Component {
    static propTypes = {
        instrumentId: PropTypes.string,
        removeInstrument: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.closeRemoveConfirmation = this.closeRemoveConfirmation.bind(this);
        this.removeInstrument = this.removeInstrument.bind(this);
    }

    state = {isConfirmationRemoveActive: false};

    render() {
        let {instrumentId} = this.props;

        let confirmationModalProps = {
            title: 'Confirm',
            mode: 'confirmation',
            isOpen: this.state.isConfirmationRemoveActive,
            onRequestClose: this.closeRemoveConfirmation,
            contentLabel: "modal",
            buttons: [
                { title: 'Yes', click: this.removeInstrument},
                { title: 'No', click: this.closeRemoveConfirmation}
            ]
        };

        let removeButtonProps = {
            styleName: "remove",
            onClick: this.onRemoveClick
        };
    
        return (
            <div>
                <div {...removeButtonProps}></div>
                <Modal {...confirmationModalProps}>
                    <div styleName="remove-modal-content">Do you want to delete this instrument ?</div>
                </Modal>
            </div>
        );
    }

    removeInstrument(){
        this.closeRemoveConfirmation();
        this.props.removeInstrument(this.props.instrumentId);
    }

    openRemoveConfirmation(){
        this.setState({isConfirmationRemoveActive: true});
    }

    closeRemoveConfirmation(){
        this.setState({isConfirmationRemoveActive: false});
    }

    onRemoveClick() {
        this.openRemoveConfirmation();
    }
}

export default CSSModules(RemoveButton, styles, { allowMultiple: true });