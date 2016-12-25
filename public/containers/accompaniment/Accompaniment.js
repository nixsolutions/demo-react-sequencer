import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Piano from 'components/blocks/piano/Piano';
import Effects from 'components/blocks/effects/Effects';
import Slider from 'components/common/slider/Slider';
import Dropdown from 'components/common/dropdown/Dropdown';
import Tabs from 'components/common/tabs/Tabs';
import PianoManager from './PianoManager';
import MasterEffectsManager from './MasterEffectsManager';
import {addPlayedNote, removePlayedNote} from 'modules/playedNotes';
import {updatePianoVolume} from 'modules/pianoVolume';
import {updateAccompanimentInstrument} from 'modules/accompanimentInstrument';
import {bindToKey} from 'modules/bindings';
import {
    changeWetMasterEffect,
    toggleMuteMasterEffect,
    changeSettingMasterEffect,
} from 'modules/masterEffects';

class Accompaniment extends Component {
    static propTypes = {
        addPlayedNote: PropTypes.func,
        removePlayedNote: PropTypes.func,
        bindToKey: PropTypes.func,
        updatePianoVolume: PropTypes.func,
        updateAccompanimentInstrument: PropTypes.func,
        changeWetMasterEffect: PropTypes.func,
        toggleMuteMasterEffect: PropTypes.func,
        changeSettingMasterEffect: PropTypes.func,
        masterEffects: PropTypes.array,
        playedNotes: PropTypes.array,
    };

    render() {
        return <Tabs>
            <div styleName="section-holder" label="piano">
                <div styleName="controls-panel">
                    <Dropdown styleMode="style2"
                              title={this.props.accompanimentInstrument.name || 'Select instrument'}
                              onSelect={this.props.updateAccompanimentInstrument}
                              items={this.props.dropdownItems}/>
                    <div styleName="piano-volume">
                        <Slider onChange={this.props.updatePianoVolume}
                                value={this.props.pianoVolume}/>
                    </div>
                </div>
                <div styleName="instrument-holder">
                    <Piano onKeyDown={this.props.addPlayedNote}
                           onKeyUp={this.props.removePlayedNote}
                           playedNotes={this.props.playedNotes}
                           bindToKey={this.props.bindToKey}/>
                    <PianoManager/>
                </div>
            </div>
            <div styleName="section-holder" label="effects">
                <div styleName="controls-panel"></div>
                <div styleName="instrument-holder">
                    <Effects effects={this.props.masterEffects}
                             toggleMute={this.props.toggleMuteMasterEffect}
                             changeWet={this.props.changeWetMasterEffect}
                             changeSetting={this.props.changeSettingMasterEffect}/>
                    <MasterEffectsManager/>
                </div>
            </div>
        </Tabs>
    }
}

export default connect(mapStateToProps, {
    addPlayedNote,
    removePlayedNote,
    bindToKey,
    updatePianoVolume,
    updateAccompanimentInstrument,
    changeWetMasterEffect,
    toggleMuteMasterEffect,
    changeSettingMasterEffect,
})(CSSModules(Accompaniment, styles));

function mapStateToProps(state) {
    return {
        playedNotes: state.playedNotes,
        pianoVolume: state.pianoVolume,
        dropdownItems: samplesToDropdownItems(state.samples),
        accompanimentInstrument: state.accompanimentInstrument,
        masterEffects: state.masterEffects,
    };
}

function samplesToDropdownItems(samples) {
    return samples.map(item => ({title: item.name, value: item}));
}