import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Piano from 'components/blocks/piano/Piano';
import PianoManager from './PianoManager';
import Tone from 'tone';
import {addPlayedNote, removePlayedNote} from 'modules/playedNotes';
import {bindToKey} from 'modules/bindings';

class Accompaniment extends Component {
    render(){ 
        return <div>
            <Piano onKeyDown={this.props.addPlayedNote}  
                    onKeyUp={this.props.removePlayedNote}
                    bindToKey={this.props.bindToKey}/>
            <PianoManager/>
        </div> 
    }
}

Accompaniment.propTypes = {
    addPlayedNote: PropTypes.func,
    removePlayedNote: PropTypes.func,
    bindToKey: PropTypes.func,
};

export default connect(mapStateToProps, {
    addPlayedNote,
    removePlayedNote,
    bindToKey
})(Accompaniment);

function mapStateToProps(state){
    return {
       
    };
}