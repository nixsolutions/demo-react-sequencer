import React, {Component} from 'react';
import Controller from 'components/common/controller/Controller';
import {connect} from 'react-redux';
import {updateInstrumentVolume} from 'modules/instruments';

class InstrumentVolumeController extends Component{
    constructor(props){
        super(props);

        this.updateInstrumentVolume = this.updateInstrumentVolume.bind(this);
    }

    render(){
        return <Controller {...this.props} onChange={this.updateInstrumentVolume} />;
    }

    updateInstrumentVolume(volume) {
        this.props.updateInstrumentVolume(this.props.instrumentId, volume);
    }
}

export default connect(mapStateToProps, {
    updateInstrumentVolume
})(InstrumentVolumeController);

function mapStateToProps(state, props){
    return {
        size: 34,
        value: state.instruments.byId[props.instrumentId].volume
    }
}