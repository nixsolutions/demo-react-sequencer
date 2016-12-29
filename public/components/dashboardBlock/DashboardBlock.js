import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';

class DashBoardBlock extends PureComponent {
    render() {
        return <div styleName="dashboard-block">{this.props.children}</div>
    }
}


export default CSSModules(DashBoardBlock, styles, {allowMultiple: true});