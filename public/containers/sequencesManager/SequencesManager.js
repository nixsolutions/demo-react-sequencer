import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dropdown from 'components/common/dropdown/Dropdown';
import PlayControls from 'components/blocks/playControls/PlayControls';
import Bpm from './Bpm';
import Sequences from 'components/blocks/sequences/Sequences';
import {updatePlay} from 'modules/play';
import {
    toggleStep, 
    toggleInstrument, 
    addInstrument, 
    removeInstrument, 
    updateInstrumentVolume
} from 'modules/instruments';
import {updateVolume} from 'modules/volume';
import {bindToKey} from 'modules/bindings';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';
import StepIndicator from 'components/blocks/stepIndicator/StepIndicator';

class SequencesManager extends Component {
    static propTypes = {
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
        toggleInstrument: PropTypes.func,
        removeInstrument: PropTypes.func,
        updateInstrumentVolume: PropTypes.func,
        bindToKey: PropTypes.func,
    };

    componentWillMount(){
        this.addInitialInstruments(3);
    }

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
                    <Bpm />
                </div>
                <div styleName="sequences-holder">
                    <div styleName="sequences-wrapper">
                        <ScrollableBlock autoHeightMax={170}>
                            <Sequences {...sequencesProps}/>
                        </ScrollableBlock>
                    </div>
                </div>
                <div styleName="step-indicator-holder">
                    <StepIndicator activeIndex={this.props.playedStep}/>
                </div>
            </div>
        ); 
    }

    addInitialInstruments(instrumentsAmount){
        let samples = this.props.samples.slice(0, instrumentsAmount);

        samples.forEach(sample => {
            this.props.addInstrument(sample);
        });
    }
}

export default connect(mapStateToProps, {
    updatePlay,
    toggleStep,
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume,
    addInstrument,
    bindToKey,
})(CSSModules(SequencesManager, styles));

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        samples: state.samples,
        dropdownItems: samplesToDropdownItems(state.samples),
        play: state.play,
        bpm: state.bpm,
        playedStep: state.playedStep,
    };
}

function samplesToDropdownItems(samples){
    return samples.map(item => ({title: item.name, value: item}));
}