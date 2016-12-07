import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {Component, PropTypes} from 'react';

class Spinner extends Component {
    render() {
        let cssClass = ['spinner', this.props.active ? 'active' : ''].join(' ');

        return <div styleName={cssClass}></div>
    }
};

Spinner.propTypes = {
    active: PropTypes.bool
}

export default CSSModules(Spinner, styles, {allowMultiple: true});