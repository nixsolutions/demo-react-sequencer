import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PlayButton from 'components/common/buttons/playButton/PlayButton';
import SequenceEditor from 'components/blocks/sequenceEditor/SequenceEditor';
import {updatePlay} from 'modules/play';

class Sampler extends Component {
    render(){
        return (
            <div>
                <PlayButton active={this.props.play} 
                            onToggle={this.props.updatePlay}></PlayButton>
                <SequenceEditor steps={[
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: true},
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: true},
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: false},
                    {active: false}
                    ]}/>
            </div>
        ); 
    }

    togglePlay(){

    }
}

Sampler.propTypes = {
    play: PropTypes.bool
};

export default connect(mapStateToProps, {
    updatePlay
})(Sampler);

function mapStateToProps(state){
    return {
        matrix: state.matrix,
        play: state.play,
    };
}