import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Piano from 'components/blocks/piano/Piano';
import Controller from 'components/common/controller/Controller';
import VerticalControls, {VerticalItem} from 'components/common/verticalControls/VerticalControls';
import PianoManager from './PianoManager';
import Tone from 'tone';
import {addPlayedNote, removePlayedNote} from 'modules/playedNotes';
import {bindToKey} from 'modules/bindings';

class Accompaniment extends Component {
    render(){ 
        return <div>
            <div styleName="section-holder">
                <div styleName="controls-holder">
                    <VerticalControls>
                        <VerticalItem label="volume"> 
                            <Controller size="30"/>
                        </VerticalItem>
                    </VerticalControls>
                </div>
                <div styleName="instrument-holder">
                    <Piano onKeyDown={this.props.addPlayedNote}  
                        onKeyUp={this.props.removePlayedNote}
                        bindToKey={this.props.bindToKey}/>
                    <PianoManager/>
                </div>
            </div>
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
})(CSSModules(Accompaniment, styles));

function mapStateToProps(state){
    return {
       
    };
}