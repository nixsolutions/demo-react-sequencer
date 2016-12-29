import React, {PureComponent, PropTypes} from 'react';
import { connect } from 'react-redux';
import {updatePlayedStep} from 'modules/playedStep';
import * as midi from 'utils/midi';

class KeyboardNavigation extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props, state){
        super(props, state);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentWillMount(){
        midi.connect(this.handleKeyDown, this.handleKeyUp);

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    render(){ return <div></div> }

    handleKeyDown(e){
        let {keyCode} = e;

        this.props.bindings[keyCode] && 
        this.props.bindings[keyCode].down && 
        this.props.bindings[keyCode].down(e);
    }

    handleKeyUp(e){
        let {keyCode} = e;

        this.props.bindings[keyCode] && 
        this.props.bindings[keyCode].up && 
        this.props.bindings[keyCode].up(e);
    }


}

export default connect(mapStateToProps)(KeyboardNavigation);

function mapStateToProps(state){
    return {
        bindings: state.bindings
    };
}