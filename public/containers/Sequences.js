import React, {Component} from 'react';
import Sequences from 'components/blocks/sequences/Sequences';
import {connect} from 'react-redux';
import {addInstrument} from 'modules/instruments';
import {updatePlay} from 'modules/play';

class SequencesBlock extends Component {
    componentWillMount() {
        document.addEventListener('visibilitychange', () => {
            this.props.updatePlay('stop');
        });
    }

    render(){
        return <Sequences instrumentsIds={this.props.instrumentsIds}/>;
    }
}

export default connect(mapStateToProps, {
    updatePlay,
})(SequencesBlock);

function mapStateToProps(state) {
    return {
        instrumentsIds: state.instruments.allIds,
    };
}