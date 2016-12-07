import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {Component, PropTypes} from 'react';
import Octave from './octave/Octave';
import Tone from 'tone';
import {
    noteToPitch
} from 'utils/notes';

class Piano extends Component {
    componentWillMount(){
        this.sample = new Tone.Sampler('./samples/piano.wav').toMaster();
    }

    render() {
        const OCTAVES = [2, 3, 4];
        let items = OCTAVES.map(octave => {
            return <li key={octave}>
                    <Octave number={octave} 
                        onKeyDown={this.onKeyDown.bind(this)} 
                        onKeyUp={this.onKeyUp.bind(this)}/>
                    </li>
        });

        return <div styleName="piano">
                <ul styleName="octaves">{items}</ul>
            </div>
    }

    onKeyDown(note){
        let pitch = noteToPitch(note);

        this.sample.triggerAttack(pitch);
    }

    onKeyUp(note){
        this.sample.triggerRelease();
    }
};

export default CSSModules(Piano, styles);



