import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class StopButton extends Component {
    static propTypes = {
        children: PropTypes.node,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = {active: false};

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        let activeClass = this.props.active ? 'active' : '';
        let styleName = ['stop-button', activeClass].join(' ');
        let buttonProps = {
            styleName,
            onClick: this.onClick,
            disabled: this.props.disabled
        };

        return (
            <div styleName={`button-wrapper ${activeClass}`}>
                <button {...buttonProps } />
            </div>
        );
    }

    onClick() {
        this.props.onClick && this.props.onClick('stop');
    }
}

export default CSSModules(StopButton, styles, {allowMultiple: true});