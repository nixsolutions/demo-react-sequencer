import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

import MasterVolume from './MasterVolume';
import Analyser from './Analyser';

class PanelControls extends Component {
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