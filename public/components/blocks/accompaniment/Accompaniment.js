import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component} from 'react';

import Tabs from 'components/common/tabs/Tabs';

import MasterEffects from 'containers/MasterEffects';
import MasterEffectsManager from 'containers/MasterEffectsManager';

import Piano from 'containers/Piano';
import PianoVolume from 'containers/PianoVolume';
import PianoManager from 'containers/PianoManager';
import PianoInstrumentDropdown from 'containers/PianoInstrumentDropdown';

class Accompaniment extends Component {
    render() {
        return <Tabs>
            <div styleName="section-holder" label="piano">
                <div styleName="controls-panel">
                    <PianoInstrumentDropdown />
                    <div styleName="piano-volume">
                        <PianoVolume />
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

export default CSSModules(Accompaniment, styles);
