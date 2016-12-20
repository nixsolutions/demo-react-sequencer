import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

class DropdownComponent extends Component {
    static defaultProps = {
        styleMode: 'style1'
    };

    state = { active: false };

    render() {
        let items = this.props.items.map((item, i) => {
            return <li key={i} onClick={this.onSelect.bind(this, item.value)}>{item.title}</li>
        });
        let content = items.length ? (<ul styleName="dropdown-list">{items}</ul>) : this.props.children;
        let activeClass = this.state.active ? 'active' : '';
        let cssClass = ['dropdown', this.props.styleMode, activeClass].join(' ');
        let dropdownProps = {
            styleName: cssClass,
            onShow: this.onShow.bind(this),
            onHide: this.onHide.bind(this),
            ref: 'dropdown'
        }

        return <div styleName={`dropdown-holder ${this.props.styleMode}`}>
            <div styleName="dropdown-wrapper">
                <Dropdown {...dropdownProps}>
                    <DropdownTrigger styleName="dropdown-trigger-area">{this.props.title} <span styleName="arrow"></span></DropdownTrigger>
                    <DropdownContent>
                        <div styleName="holder">
                            <ScrollableBlock autoHeightMax={122}>{content}</ScrollableBlock>
                        </div>
                    </DropdownContent>
                </Dropdown>
            </div>
        </div>
    }

    onShow() {
        this.setState({ active: true });
    }

    onHide() {
        this.setState({ active: false });
    }

    onSelect(value, e) {
        this.refs.dropdown.hide();
        this.props.onSelect(value);
    }
}

DropdownComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: React.PropTypes.string,
        value: React.PropTypes.any
    })),
    children: PropTypes.node,
    title: PropTypes.string,
    onSelect: PropTypes.func.isRequired
};

export default CSSModules(DropdownComponent, styles, { allowMultiple: true });