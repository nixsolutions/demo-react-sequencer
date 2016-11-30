import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class StopButton extends Component {
    static defaultProps() {
        return { active: false };
    }

    render() {
        let styleName = ['stop-button', this.props.active ? 'active' : ''].join(' ');
        return <button {...this.props} styleName={styleName}>{this.props.children}</button>
    }
}

StopButton.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool
};

export default CSSModules(StopButton, styles, {allowMultiple: true});