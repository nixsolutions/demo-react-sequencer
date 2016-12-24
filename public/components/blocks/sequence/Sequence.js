import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceEditor from './sequenceEditor/SequenceEditor';
import SequenceControl from './sequenceControl/SequenceControl';
import Modal from 'components/common/modal/Modal';

class Sequence extends Component {
    static propTypes = {
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

    constructor(props){
        super(props);

        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.closeRemoveConfirmation = this.closeRemoveConfirmation.bind(this);
        this.removeInstrument = this.removeInstrument.bind(this);
    }

    state = {isConfirmationRemoveActive: false};

    render() {
        let {instrument, playedStep, toggleStep} = this.props;

        let removeButtonProps = {
            styleName: "remove-button",
            onClick: this.onRemoveClick
        };

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

        let sequenceControlProps = {
            instrument,
            toggleInstrument: this.props.toggleInstrument,
            updateInstrumentVolume: this.props.updateInstrumentVolume
        };

        let sequenceEditorProps = {
            instrument,
            playedStep,
            onToggleStep: toggleStep
        };


        return <div styleName="sequence">
            <div styleName="control-holder">
                <SequenceControl {...sequenceControlProps}/>
            </div>
            <div>
                <SequenceEditor {...sequenceEditorProps}/>
            </div>
            <div {...removeButtonProps}><div styleName="remove"></div></div>
            <Modal {...confirmationModalProps}>
                <div styleName="remove-modal-content">Do you want to delete this instrument ?</div>
            </Modal>
        </div>;
    }

    removeInstrument(){
        this.closeRemoveConfirmation();
        this.props.removeInstrument(this.props.instrument);
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
};

export default CSSModules(Sequence, styles, {allowMultiple: true});