import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import MuteInstrumentButton from 'containers/MuteInstrumentButton';
import InstrumentVolumeController from 'containers/InstrumentVolumeController';
import FxButton from '../fxButton/FxButton';

class InstrumentDashboard extends Component {
    static propTypes = {
        instrumentId: PropTypes.string,
        instrumentName: PropTypes.string,
    };

    render() {
        let {instrumentId, instrumentName} = this.props;
    
        return (
            <div styleName="instrument-dashboard">
                <MuteInstrumentButton instrumentId={instrumentId} />
                <div styleName="instrument-block">
                    <div styleName="name" title={instrumentName}>{instrumentName}</div>
                    <InstrumentVolumeController instrumentId={instrumentId} />
                    <FxButton instrumentId={instrumentId} instrumentName={instrumentName} />
                </div>
            </div>
        );
    }
}

export default CSSModules(InstrumentDashboard, styles, { allowMultiple: true });