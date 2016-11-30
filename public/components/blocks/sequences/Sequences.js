import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import SequenceEditor from 'components/blocks/sequenceEditor/SequenceEditor';

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
        return (<li key={i}><SequenceEditor steps={instrument.notes}/></li>);
    }
}

Sequences.propTypes = {
    instruments: PropTypes.arrayOf(PropTypes.shape({
            path: PropTypes.string,
            active: PropTypes.bool,
            notes: PropTypes.array
        })
    )
};

export default CSSModules(Sequences, styles, {allowMultiple: true});