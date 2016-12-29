import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';

class Dashboard extends PureComponent {
    render() {
        return <div styleName="dashboard">
            <div styleName="dashboard-holder">
                {this.props.children}
            </div>
        </div>
    }
}


export default CSSModules(Dashboard, styles, {allowMultiple: true});