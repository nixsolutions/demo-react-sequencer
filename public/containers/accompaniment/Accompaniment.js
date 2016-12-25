import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import MasterEffects from './MasterEffects';
import Slider from 'components/common/slider/Slider';
import Dropdown from 'components/common/dropdown/Dropdown';
import Tabs from 'components/common/tabs/Tabs';
import PianoManager from './PianoManager';
import MasterEffectsManager from './MasterEffectsManager';
import Piano from './Piano';
import {updatePianoVolume} from 'modules/pianoVolume';
import {updateAccompanimentInstrument} from 'modules/accompanimentInstrument';

class Accompaniment extends Component {
    static propTypes = {
        updatePianoVolume: PropTypes.func,
        updateAccompanimentInstrument: PropTypes.func,
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
                    <Piano/>
                    <PianoManager/>
                </div>
            </div>
            <div styleName="section-holder" label="effects">
                <div styleName="controls-panel"></div>
                <div styleName="instrument-holder">
                    <MasterEffects/>
                    <MasterEffectsManager/>
                </div>
            </div>
        </Tabs>
    }
}

export default connect(mapStateToProps, {
    updatePianoVolume,
    updateAccompanimentInstrument,
})(CSSModules(Accompaniment, styles));

function mapStateToProps(state) {
    return {
        pianoVolume: state.pianoVolume,
        dropdownItems: samplesToDropdownItems(state.samples),
        accompanimentInstrument: state.accompanimentInstrument,
    };
}

function samplesToDropdownItems(samples) {
    return samples.map(item => ({title: item.name, value: item}));
}