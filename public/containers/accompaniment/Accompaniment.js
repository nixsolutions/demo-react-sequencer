import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Piano from 'components/blocks/piano/Piano';
import PianoManager from './PianoManager';
import Tone from 'tone';
import {addPlayedNote, removePlayedNote} from 'modules/playedNotes';

class Accompaniment extends Component {
    render(){ 
        return <div>
            <Piano onKeyDown={this.props.addPlayedNote}  
                    onKeyUp={this.props.removePlayedNote}/>
            <PianoManager/>
        </div> 
    }
}

Accompaniment.propTypes = {
    addPlayedNote: PropTypes.func,
    removePlayedNote: PropTypes.func,
};

export default connect(mapStateToProps, {
    addPlayedNote,
    removePlayedNote
})(Accompaniment);

function mapStateToProps(state){
    return {
       
    };
}