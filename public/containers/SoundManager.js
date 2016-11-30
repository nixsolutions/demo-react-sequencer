import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class SoundManager extends Component {
    componentWillReceiveProps(nextProps) {
        debugger
        let {matrix} = nextProps;
        if (matrix && matrix !== this.props.matrix) {
            console.log(matrix);
        }
    }
    render(){ return <div></div>; }
}

SoundManager.propTypes = {
    children: PropTypes.node
};

export default connect(mapStateToProps)(SoundManager);

function mapStateToProps(state){
    return {
        matrix: state.matrix
    };
}