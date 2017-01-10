import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class PauseButton extends Component {
    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.string,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = { active: false };

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        const { type, active, disabled } = this.props;

        let activeClass = active ? 'active' : '';
        let styleName = ['control-button', type, activeClass].join(' ');
        let buttonProps = {
            styleName,
            onClick: this.onClick,
            disabled: disabled
        };
        
        return (
            <div styleName={`button-wrapper ${activeClass}`}>
                <button {...buttonProps} />
            </div >
        );
    }

    onClick(){
        let value = this.props.active ? 'play' : 'pause';
        this.props.onClick && this.props.onClick(value);
    }
}

export default CSSModules(PauseButton, styles, { allowMultiple: true });