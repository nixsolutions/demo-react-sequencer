import CSSModules from 'react-css-modules';
import styles from './styles.less';

import React, {PureComponent, PropTypes} from 'react';

class Spinner extends PureComponent {
    render() {
        let cssClass = ['spinner', this.props.active ? 'active' : ''].join(' ');

        return <div styleName={cssClass}></div>
    }
};

Spinner.propTypes = {
    active: PropTypes.bool
}

export default CSSModules(Spinner, styles, {allowMultiple: true});