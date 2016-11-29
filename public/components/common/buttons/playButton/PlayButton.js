import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class PlayButton extends Component {
    static defaultProps() {
        return { active: false };
    }

    render() {
        let styleName = ['play-button', this.props.active ? 'active' : ''].join(' ');
        return <button {...this.props} styleName={styleName}>{this.props.children}</button>
    }
}

PlayButton.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool
};

export default CSSModules(PlayButton, styles, {allowMultiple: true});