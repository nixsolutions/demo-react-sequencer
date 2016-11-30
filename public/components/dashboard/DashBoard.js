import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class DashBoard extends Component {
    render() {
        return <div styleName="dashboard">{this.props.children}</div>
    }
}


export default CSSModules(DashBoard, styles, {allowMultiple: true});