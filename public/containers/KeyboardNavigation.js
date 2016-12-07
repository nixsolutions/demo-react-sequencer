import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {updatePlayedStep} from 'modules/playedStep';

class KeyboardNavigation extends Component {
    constructor(props, state){
        super(props, state);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentWillMount(){
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown.bind());
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    render(){ return <div></div> }

    handleKeyDown(e){
        let {keyCode} = e;

        this.props.bindings[keyCode] && this.props.bindings[keyCode].down();
    }

    handleKeyUp(e){
        let {keyCode} = e;

        this.props.bindings[keyCode] && this.props.bindings[keyCode].up();
    }


}

KeyboardNavigation.propTypes = {
   children: PropTypes.node
};

export default connect(mapStateToProps)(KeyboardNavigation);

function mapStateToProps(state){
    return {
        bindings: state.bindings
    };
}