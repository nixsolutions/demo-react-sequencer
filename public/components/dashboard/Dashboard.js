import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Dashboard extends Component {
    render() {
        return <div styleName="dashboard">
            <div styleName="dashboard-holder">
                {this.props.children}
            </div>
        </div>
    }
}


export default CSSModules(Dashboard, styles, {allowMultiple: true});