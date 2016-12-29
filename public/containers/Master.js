import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import {updateAnalyser} from 'modules/analyser';
import {updateLoadingState} from 'modules/loadingState';
import {percentsToDecibels} from 'utils/notes';

class Master extends Component {
    constructor(props, context){
        super(props, context);

        this.analyser = null;
    }

    componentWillMount() {
        this.initAnalyser();
        this.updateVolume(this.props.volume);

        Tone.Buffer.on('load', () => {
            this.props.updateLoadingState(false);
            Tone.Transport.start()
        });
    }

    componentWillReceiveProps(nextProps) {
        this.applyUpdates(nextProps);
    }

    render(){ return <div></div> }

    applyUpdates(nextProps){
        let {volume} = nextProps;

        if (volume !== this.props.volume) {
            this.updateVolume(volume);
        }
    }

    updateVolume(volumePercents){
        Tone.Master.volume.value = percentsToDecibels(volumePercents);
    }

    initAnalyser(){
        this.analyser = new Tone.Analyser("fft", 32);
        this.props.updateAnalyser(this.analyser);
        Tone.Master.fan(this.analyser);
    }
}

Master.propTypes = {
    volume: PropTypes.number,
    updateLoadingState: PropTypes.func
};

export default connect(mapStateToProps, {
    updateAnalyser,
    updateLoadingState
})(Master);

function mapStateToProps(state){
    return {
        volume: state.volume
    };
}