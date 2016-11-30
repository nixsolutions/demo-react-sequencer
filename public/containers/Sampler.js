import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PlayButton from 'components/common/buttons/playButton/PlayButton';
import Sequences from 'components/blocks/sequences/Sequences';
import {updatePlay} from 'modules/play';

class Sampler extends Component {
    render(){
        return (
            <div>
                <PlayButton active={this.props.play} 
                            onToggle={this.props.updatePlay}></PlayButton>
                <Sequences instruments={this.props.instruments}/>
            </div>
        ); 
    }
}

Sampler.propTypes = {
    play: PropTypes.bool,
    instruments: PropTypes.arrayOf(PropTypes.shape({
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    )
};

export default connect(mapStateToProps, {
    updatePlay
})(Sampler);

function mapStateToProps(state){
    return {
        instruments: state.instruments,
        play: state.play,
    };
}