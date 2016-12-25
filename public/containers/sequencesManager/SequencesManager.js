import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

import Bpm from './Bpm';
import Sequences from './Sequences';
import SequencesDropdown from './SequencesDropdown';
import SequencesPlayControlls from './SequencesPlayControlls';
import SequencesStepIndicator from './SequencesStepIndicator';

class SequencesManager extends Component {
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
                        <ScrollableBlock autoHeightMax={170}>
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

export default CSSModules(SequencesManager, styles);