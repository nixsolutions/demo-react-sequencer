import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class PauseButton extends Component {
    static defaultProps = { active: false };

    render() {
        let styleName = ['pause-button', this.props.active ? 'active' : ''].join(' ');
        return <button {...this.props} styleName={styleName}>{this.props.children}</button>
    }
}

PauseButton.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool
};

export default CSSModules(PauseButton, styles, {allowMultiple: true});