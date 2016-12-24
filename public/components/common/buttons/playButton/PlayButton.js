import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class PlayButton extends Component {
    static propTypes = {
        children: PropTypes.node,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    }

    static defaultProps = {active: false};

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        let activeClass = this.props.active ? 'active' : '';
        let styleName = ['play-button', activeClass].join(' ');
        let buttonProps = {
            ...this.props,
            styleName,
            onClick: this.onClick,
            disabled: this.props.disabled
        };

        return (
            <div styleName={`button-wrapper ${activeClass}` }>
                <button {...buttonProps} />
            </div >
        );
    }

    onClick() {
        let value = this.props.active ? 'pause' : 'play';
        this.props.onClick && this.props.onClick(value);
    }
}

export default CSSModules(PlayButton, styles, {allowMultiple: true});