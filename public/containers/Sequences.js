import React, {PureComponent} from 'react';
import Sequences from 'components/blocks/sequences/Sequences';
import {connect} from 'react-redux';
import {addInstrument} from 'modules/instruments';
import {updatePlay} from 'modules/play';

class SequencesBlock extends PureComponent {
    componentWillMount() {
        document.addEventListener('visibilitychange', () => {
            this.props.updatePlay('stop');
        });

        this.addInitialInstruments(3);
    }

    render(){
        return <Sequences instrumentsIds={this.props.instrumentsIds}/>;
    }

    addInitialInstruments(instrumentsAmount) {
        let samples = this.props.samples.slice(0, instrumentsAmount);

        samples.forEach(sample => {
            this.props.addInstrument(sample);
        });
    }
}

export default connect(mapStateToProps, {
    updatePlay,
    addInstrument,
})(SequencesBlock);

function mapStateToProps(state) {
    return {
        samples: state.samples,
        instrumentsIds: state.instruments.allIds,
    };
}