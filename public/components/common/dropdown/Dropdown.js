import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

class DropdownItem extends Component {
    static propTypes = {
        value: PropTypes.any,
        title: PropTypes.string,
        onSelect: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.onSelect = this.onSelect.bind(this);
    };

    render(){
        return <div onClick={this.onSelect}>{this.props.title}</div>;
    }

    onSelect(){
        this.props.onSelect(this.props.value);
    }
};

class DropdownComponent extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            title: React.PropTypes.string,
            value: React.PropTypes.any
        })),
        children: PropTypes.node,
        title: PropTypes.string,
        onSelect: PropTypes.func.isRequired
    };

    static defaultProps = {
        styleMode: 'style1'
    };

    constructor(props){
        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    };

    state = { active: false };

    render() {
        let items = this.props.items.map((item, i) => {
            let {value, title} = item;
            let dropdownItemProps = {
                value,
                title,
                onSelect: this.onSelect,
            };
            return <li key={i}><DropdownItem {...dropdownItemProps} /></li>
        });
        let content = items.length ? (<ul styleName="dropdown-list">{items}</ul>) : this.props.children;
        let activeClass = this.state.active ? 'active' : '';
        let cssClass = ['dropdown', this.props.styleMode, activeClass].join(' ');
        let dropdownProps = {
            styleName: cssClass,
            onShow: this.onShow,
            onHide: this.onHide,
            ref: 'dropdown'
        };

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

    onSelect(value) {
        this.refs.dropdown.hide();
        this.props.onSelect(value);
    }
};

export default CSSModules(DropdownComponent, styles, { allowMultiple: true });