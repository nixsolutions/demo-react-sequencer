import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class SequenceControl extends Component {
    render() {
        return <div styleName="sequence-control">some</div>
    }
}

SequenceControl.propTypes = {
    instrument: PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
        active: PropTypes.bool,
        notes: PropTypes.array
    })
};

export default CSSModules(SequenceControl, styles, {allowMultiple: true});