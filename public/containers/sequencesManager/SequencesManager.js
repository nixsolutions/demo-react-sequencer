import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dropdown from 'components/common/dropdown/Dropdown';
import PlayControls from 'components/blocks/playControls/PlayControls';
import Sequences from 'components/blocks/sequences/Sequences';
import BpmEditor from 'components/blocks/bpmEditor/BpmEditor';
import Slider from 'components/common/slider/Slider';
import Analyser from 'components/blocks/analyser/Analyser';
import {updatePlay} from 'modules/play';
import {toggleStep, toggleInstrument, addInstrument, removeInstrument, updateInstrumentVolume} from 'modules/instruments';
import {updateBPM} from 'modules/bpm';
import {updateVolume} from 'modules/volume';

class SequencesManager extends Component {
    render(){
        return (
            <div>
                <PlayControls updatePlay={this.props.updatePlay}
                              playState={this.props.play}
                
                 />
                <Analyser analyser={this.props.analyser}/>
                <Slider value={this.props.volume} onChange={this.props.updateVolume}/>
                <BpmEditor onChange={this.props.updateBPM} value={this.props.bpm}/>
                <Sequences instruments={this.props.instruments}
                            playedStep={this.props.playedStep}
                            toggleInstrument={this.props.toggleInstrument}
                            removeInstrument={this.props.removeInstrument}
                            updateInstrumentVolume={this.props.updateInstrumentVolume}
                            onToggleStep={this.props.toggleStep}/>
                <div styleName="add-holder">
                    <Dropdown items={this.props.dropdownItems} 
                        onSelect={this.props.addInstrument} 
                        title="Add instrument"/>
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
};

export default connect(mapStateToProps, {
        updatePlay,
        toggleStep,
        updateBPM,
        toggleInstrument,
        removeInstrument,
        updateInstrumentVolume,
        updateVolume,
        addInstrument
    })(CSSModules(SequencesManager, styles));

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        instrumentsSet: state.instrumentsSet,
        dropdownItems: instrumentsSetToDropdownItems(state.instrumentsSet),
        play: state.play,
        bpm: state.bpm,
        playedStep: state.playedStep,
        volume: state.volume,
        analyser: state.analyser
    };
}

function instrumentsSetToDropdownItems(instrumentsSet){
    return instrumentsSet.map(item => ({title: item.name, value: item}));
}