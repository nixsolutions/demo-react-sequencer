import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { PureComponent, PropTypes } from 'react';

import MasterVolume from 'containers/MasterVolume';
import Analyser from 'containers/Analyser';

class PanelControls extends PureComponent {
    render() {
        return (
            <div styleName="panel-controls">
                <MasterVolume />
                <Analyser />
            </div>
        );
    }
}

export default CSSModules(PanelControls, styles);