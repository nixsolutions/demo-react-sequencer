import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import SequencesDropdown from './SequencesDropdown';
import SequencesPlayControlls from './SequencesPlayControlls';
import Bpm from './Bpm';
import Sequences from 'components/blocks/sequences/Sequences';
import {
    toggleStep, 
    toggleInstrument, 
    addInstrument, 
    removeInstrument, 
    updateInstrumentVolume
} from 'modules/instruments';
import {updateVolume} from 'modules/volume';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';
import StepIndicator from 'components/blocks/stepIndicator/StepIndicator';

class SequencesManager extends Component {
    static propTypes = {
        playedStep: PropTypes.number,
        instruments: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                volume: PropTypes.number,
                path: PropTypes.string,
                active: PropTypes.bool,
                notes: PropTypes.array
            })
        ),
        toggleStep: PropTypes.func,
        toggleInstrument: PropTypes.func,
        removeInstrument: PropTypes.func,
        updateInstrumentVolume: PropTypes.func,
    };

    componentWillMount(){
        this.addInitialInstruments(3);
    }

    render(){
        let sequencesProps = {
            instruments: this.props.instruments,
            playedStep: this.props.playedStep,
            toggleInstrument: this.props.toggleInstrument,
            removeInstrument: this.props.removeInstrument,
            updateInstrumentVolume: this.props.updateInstrumentVolume,
            onToggleStep: this.props.toggleStep
        };

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
                            <Sequences {...sequencesProps}/>
                        </ScrollableBlock>
                    </div>
                </div>
                <div styleName="step-indicator-holder">
                    <StepIndicator activeIndex={this.props.playedStep}/>
                </div>
            </div>
        ); 
    }

    addInitialInstruments(instrumentsAmount){
        let samples = this.props.samples.slice(0, instrumentsAmount);

        samples.forEach(sample => {
            this.props.addInstrument(sample);
        });
    }
}

export default connect(mapStateToProps, {
    toggleStep,
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume,
    addInstrument,
})(CSSModules(SequencesManager, styles));

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        samples: state.samples,
        playedStep: state.playedStep,
    };
}