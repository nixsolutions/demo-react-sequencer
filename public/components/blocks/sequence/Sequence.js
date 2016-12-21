import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceEditor from './sequenceEditor/SequenceEditor';
import SequenceControl from './sequenceControl/SequenceControl';
import Modal from 'components/common/modal/Modal';

class Sequence extends Component {
    state = {isConfirmationRemoveActive: false};

    render() {
        let {instrument, playedStep, toggleStep} = this.props;

        let removeButtonProps = {
            styleName: "remove",
            onClick: this.onRemoveClick.bind(this, instrument)
        };

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

        let sequenceControlProps = {
            instrument,
            toggleInstrument: this.props.toggleInstrument,
            updateInstrumentVolume: this.props.updateInstrumentVolume
        }

        let sequenceEditorProps = {
            instrument,
            playedStep,
            onToggleStep: toggleStep
        }


        return <div styleName="sequence">
            <div styleName="control-holder">
                <SequenceControl {...sequenceControlProps}/>
            </div>
            <div>
                <SequenceEditor {...sequenceEditorProps}/>
            </div>
            <div {...removeButtonProps}></div>
            <Modal {...confirmationModalProps}>
                <div>"You want to delete an instrument ?"</div>
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

    onRemoveClick(instrument) {
        this.openRemoveConfirmation();
    }
}

Sequence.propTypes = {
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

export default CSSModules(Sequence, styles, {allowMultiple: true});