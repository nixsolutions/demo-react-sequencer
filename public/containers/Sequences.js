import React, {Component} from 'react';
import Sequences from 'components/blocks/sequences/Sequences';
import {connect} from 'react-redux';
import {
    addInstrument,
    toggleStep,
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume
} from 'modules/instruments';

class SequencesBlock extends Component {
    componentWillMount() {
        this.addInitialInstruments(3);
    }

    render(){
        return <Sequences {...this.props}/>;
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
    toggleInstrument,
    removeInstrument,
    updateInstrumentVolume,
    onToggleStep: toggleStep
})(SequencesBlock);

function mapStateToProps(state) {
    return {
        samples: state.samples,
        instruments: state.instruments,
        playedStep: state.playedStep,
    };
}