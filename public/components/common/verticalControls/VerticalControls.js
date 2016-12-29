import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';

class VerticalControls extends PureComponent {
    render() {
        return <div styleName="vertical-controls">{this.props.children}</div>
    }
};

VerticalControls.propTypes = {
    children: PropTypes.node
}

export default CSSModules(VerticalControls, styles, {allowMultiple: true});

class VerticalControlsItem extends PureComponent {
    render() {
        return <div styleName="vertical-controls-item">
                    <span styleName="label">{this.props.label}</span>
                    {this.props.children}
                </div>
    }
};

VerticalControlsItem.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
}

export let VerticalItem = CSSModules(VerticalControlsItem, styles, {allowMultiple: true});