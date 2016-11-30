import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class SoundManager extends Component {
    constructor(props, context){
        super(props, context);
        this.applyUpdates(props);
    }

    componentWillReceiveProps(nextProps) {
        this.applyUpdates(nextProps);
    }

    render(){ return <div></div>; }

    applyUpdates(nextProps){
        let {matrix} = nextProps;
        if (matrix && matrix !== this.props.matrix) {
            console.log(matrix);
        }
    }
}

SoundManager.propTypes = {
    children: PropTypes.node
};

export default connect(mapStateToProps)(SoundManager);

function mapStateToProps(state){
    return {
        matrix: state.matrix,
        play: state.play,
    };
}