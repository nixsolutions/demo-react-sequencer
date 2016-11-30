import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class PlayButton extends Component {
    static defaultProps() {
        return { active: false };
    }

    render() {
        let styleName = ['play-button', this.props.active ? 'active' : ''].join(' ');
        return <button {...this.props} 
                        styleName={styleName}
                        onClick={this.onClick.bind(this)}>{this.props.children}</button>
    }

    onClick(){
        this.props.onToggle && this.props.onToggle(!this.props.active);
    }
}

PlayButton.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool
};

export default CSSModules(PlayButton, styles, {allowMultiple: true});