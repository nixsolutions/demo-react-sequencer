import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Sequence from 'components/blocks/sequence/Sequence';

class Sequences extends Component {
    static propTypes = {
        instrumentsIds: PropTypes.arrayOf(PropTypes.string),
    };

    render() {
        let {instrumentsIds} = this.props; 
        let items = instrumentsIds.map(instrumentId => {
            return (
                <li key={instrumentId}>
                    <Sequence instrumentId={instrumentId} />
                </li>
            );
        });

        return <ul styleName="sequences">{items}</ul>
    }
}

export default CSSModules(Sequences, styles, {allowMultiple: true});