import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dropdown from 'components/common/dropdown/Dropdown';
import PlayControls from 'components/blocks/playControls/PlayControls';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import Sequences from 'components/blocks/sequences/Sequences';
import {updatePlay} from 'modules/play';
import {
    toggleStep, 
    toggleInstrument, 
    addInstrument, 
    removeInstrument, 
    updateInstrumentVolume
} from 'modules/instruments';
import {updateBPM} from 'modules/bpm';
import {updateVolume} from 'modules/volume';
import {bindToKey} from 'modules/bindings';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';
import StepIndicator from 'components/blocks/stepIndicator/StepIndicator';

class SequencesManager extends Component {
    render(){
        let dropdownProps = {
            items: this.props.dropdownItems, 
            onSelect: this.props.addInstrument,
            title: "Add instrument"
        };

        let playControllsProps = {
            updatePlay: this.props.updatePlay,
            playState: this.props.play,
            bindToKey: this.props.bindToKey
        };

        let bpmEditorProps = {
            onChange: this.props.updateBPM,
            value: this.props.bpm
        };

        let sequencesProps = {
            instruments: this.props.instruments,
            playedStep: this.props.playedStep,
            toggleInstrument: this.props.toggleInstrument,
            removeInstrument: this.props.removeInstrument,
            updateInstrumentVolume: this.props.updateInstrumentVolume,
            onToggleStep: this.props.toggleStep
        };

        return (
            <div>
                <div styleName="block-holder">
                    <Dropdown {...dropdownProps}/>
                    <PlayControls {...playControllsProps}/>
                    <BpmEditor {...bpmEditorProps}/>
                </div>
                <div styleName="sequences-holder">
                    <ScrollableBlock autoHeightMax={180}>
                        <Sequences {...sequencesProps}/>
                    </ScrollableBlock>
                </div>
                <div styleName="step-indicator-holder">
                    <StepIndicator activeIndex={this.props.playedStep}/>
                </div>
            </div>
        ); 
    }
}

SequencesManager.propTypes = {
    play: PropTypes.string,
    bpm: function(props, propName, componentName) {
        let isNumber = typeof props[propName] === 'number';
        let isEmptyString = props[propName] === '';

        if (!isNumber && !isEmptyString)  {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    playedStep: PropTypes.number,
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            volume: PropTypes.number,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    updatePlay: PropTypes.func,
    toggleStep: PropTypes.func,
    updateBPM: PropTypes.func,
    toggleInstrument: PropTypes.func,
    removeInstrument: PropTypes.func,
    updateInstrumentVolume: PropTypes.func,
    bindToKey: PropTypes.func,
};

export default connect(mapStateToProps, {
    updatePlay,
    toggleStep,
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume,
    addInstrument,
    bindToKey,
    updateBPM
})(CSSModules(SequencesManager, styles));

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        samples: state.samples,
        dropdownItems: samplesToDropdownItems(state.samples),
        play: state.play,
        bpm: state.bpm,
        playedStep: state.playedStep,
        volume: state.volume,
        analyser: state.analyser
    };
}

function samplesToDropdownItems(samples){
    return samples.map(item => ({title: item.name, value: item}));
}