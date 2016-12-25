import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

import Bpm from './Bpm';
import Sequences from './Sequences';
import SequencesDropdown from './SequencesDropdown';
import SequencesPlayControlls from './SequencesPlayControlls';
import SequencesStepIndicator from './SequencesStepIndicator';

import {addInstrument} from 'modules/instruments';

class SequencesManager extends Component {
    componentWillMount() {
        this.addInitialInstruments(3);
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

    addInitialInstruments(instrumentsAmount) {
        let samples = this.props.samples.slice(0, instrumentsAmount);

        samples.forEach(sample => {
            this.props.addInstrument(sample);
        });
    }
}

export default connect(mapStateToProps, {
    addInstrument,
})(CSSModules(SequencesManager, styles));

function mapStateToProps(state) {
    return {
        samples: state.samples,
    };
}