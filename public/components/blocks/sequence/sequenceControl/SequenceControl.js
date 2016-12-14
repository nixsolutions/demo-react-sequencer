import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Controller from 'components/common/controller/Controller';
import Popup from 'components/common/popup/Popup';
import Effects from 'components/blocks/effects/Effects';
import InstrumentEffects from 'containers/instrumentEffects/InstrumentEffects';

class SequenceControl extends Component {
    render() {
        let {instrument} = this.props;
        let muteClass = ['mute', instrument.active ? 'active' : ''].join(' ');
        let muteText = instrument.active ? 'disable instrument' : 'enable instrument';

        return (
            <div styleName="sequence-control" ref="sequence-control">
                <div styleName={muteClass}
                    title={muteText}
                    onClick={this.props.toggleInstrument.bind(this, instrument)}></div>
                <div styleName="instrument-block">
                    <div styleName="name" title={instrument.name}>{instrument.name}</div>
                    <div styleName="controller">
                        <Controller size="25" value={instrument.volume} onChange={this.updateInstrumentVolume.bind(this, instrument)} />
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

    onRemoveClick(instrument) {
        let {removeInstrument} = this.props;

        Popup.show({
            title: 'Are you sure ?',
            content: "You want to delete an instrument ?",
            buttons: [
                {
                    title: 'Yes',
                    click: function () {
                        removeInstrument(instrument);
                        this.onClose();
                    }
                },
                {
                    title: 'No',
                    click: function () {
                        this.onClose();
                    }
                }
            ]
        });
    }

    onFxClick(instrument) {
        let content = <InstrumentEffects instrumentName={instrument.name}/>;

        let sequenceControlElement = this.refs['sequence-control'];
        let coords = this.getCoords(sequenceControlElement);

        Popup.show({
            title: `${instrument.name}'s effects`,
            position: { x: coords.right, y: coords.top },
            content
        });
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

    addInstrumentEffect: PropTypes.func,
    removeInstrumentEffect: PropTypes.func,
    toggleMuteInstrumentEffect: PropTypes.func,
    changeWetInstrumentEffect: PropTypes.func,
    changeSettingInstrumentEffect: PropTypes.func,
};

export default CSSModules(SequenceControl, styles, { allowMultiple: true });