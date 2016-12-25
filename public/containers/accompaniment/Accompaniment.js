import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component} from 'react';
import MasterEffects from './MasterEffects';

import Tabs from 'components/common/tabs/Tabs';
import MasterEffectsManager from './MasterEffectsManager';

import Piano from './Piano';
import PianoVolume from './PianoVolume';
import PianoManager from './PianoManager';
import PianoInstrumentDropdown from './PianoInstrumentDropdown';

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
