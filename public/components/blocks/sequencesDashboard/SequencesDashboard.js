import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

import Bpm from 'containers/Bpm';
import Sequences from 'containers/Sequences';
import SequencesDropdown from 'containers/SequencesDropdown';
import SequencesPlayControlls from 'containers/SequencesPlayControlls';
import SequencesStepIndicator from 'containers/SequencesStepIndicator';

class SequencesDashboard extends Component {
    static propTypes = {
        instrumentsAmount: PropTypes.number
    }

    componentWillReceiveProps(){
        this.updateScrollBar();
    }

    updateScrollBar(){
        this.refs.scrollbar.update();
    }

    render() {
        return (
            <div>
                <div styleName="block-holder">
                    <SequencesDropdown />
                    <SequencesPlayControlls />
                    <Bpm />
                </div>
                <div styleName="sequences-holder">
                    <div styleName="sequences-wrapper">
                        <ScrollableBlock autoHeightMax={170} ref="scrollbar">
                            <Sequences />
                        </ScrollableBlock>
                    </div>
                </div>
                <div styleName="step-indicator-holder">
                    <SequencesStepIndicator />
                </div>
            </div>
        );
    }
}

export default CSSModules(SequencesDashboard, styles);