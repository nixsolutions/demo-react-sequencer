import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Sequence from 'components/blocks/sequence/Sequence';

class Sequences extends Component {
    render() {
        let {instruments} = this.props; 
        let items = this.createItems(instruments);
        return <ul styleName="sequences">{items}</ul>
    }

    createItems(instruments){
        return instruments.map(this.createItem.bind(this));
    }

    createItem(instrument, i){
        return (
            <li key={i}>
                <Sequence
                    instrument={instrument}
                    playedStep={this.props.playedStep}
                    toggleInstrument={this.props.toggleInstrument}
                    removeInstrument={this.props.removeInstrument}
                    updateInstrumentVolume={this.props.updateInstrumentVolume}
                    toggleStep={this.props.onToggleStep}/>
            </li>);
    }
}

Sequences.propTypes = {
    instruments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    ),
    playedStep: PropTypes.number,
    onToggleStep: PropTypes.func,
    toggleInstrument: PropTypes.func,
    removeInstrument: PropTypes.func,
    updateInstrumentVolume: PropTypes.func
};

export default CSSModules(Sequences, styles, {allowMultiple: true});