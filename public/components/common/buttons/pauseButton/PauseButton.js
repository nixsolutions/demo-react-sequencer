import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class PauseButton extends Component {
    static defaultProps = { active: false };

    render() {
        let activeClass = this.props.active ? 'active' : '';
        let styleName = ['pause-button', activeClass].join(' ');
        let buttonProps = {
            ...this.props,
            styleName,
            onClick: this.onClick.bind(this),
            disabled: this.props.disabled
        }
        
        return <div styleName={`button-wrapper ${activeClass}`}>
                <button {...buttonProps} />
            </div >
    }

onClick(){
    let value = this.props.active ? 'play' : 'pause';
    this.props.onClick && this.props.onClick(value);
}
}

PauseButton.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default CSSModules(PauseButton, styles, { allowMultiple: true });