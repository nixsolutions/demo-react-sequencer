import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component} from 'react';

import Tabs from 'components/common/tabs/Tabs';

import MasterEffects from 'containers/MasterEffects';
import MasterEffectsManager from 'containers/MasterEffectsManager';

import Piano from 'containers/Piano';
import PianoVolume from 'containers/PianoVolume';
import PianoInstrumentDropdown from 'containers/PianoInstrumentDropdown';

class Accompaniment extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <div styleName="section-holder" label="piano">
                        <div styleName="controls-panel">
                            <PianoInstrumentDropdown />
                            <div styleName="piano-volume">
                                <PianoVolume />
                            </div>
                        </div>
                        <div styleName="instrument-holder">
                            <Piano/>
                        </div>
                    </div>
                    <div styleName="section-holder" label="effects">
                        <div styleName="controls-panel"></div>
                        <div styleName="instrument-holder">
                            <MasterEffects/>
                        </div>
                    </div>
                </Tabs>
                <MasterEffectsManager/>
            </div>
        )
    }
}

export default CSSModules(Accompaniment, styles);
