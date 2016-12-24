import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class TabsControl extends Component {
    static propTypes = {
        cssClass: PropTypes.string,
        label: PropTypes.string,
        onSelect: PropTypes.func,
        controlIndex: PropTypes.number,
    };

    constructor(props){
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    render(){
        let {cssClass, label} = this.props;

        return (
            <li styleName={cssClass} onClick={this.onSelect}>
                {label}
            </li>
        );
    }

    onSelect(){
        this.props.onSelect(this.props.controlIndex);
    }
}

let TabsControlStyled = CSSModules(TabsControl, styles, { allowMultiple: true });

class TabsComponent extends Component {
    static propTypes = {
        children: PropTypes.node,
        selectedIndex: PropTypes.number,
    };

    constructor(props){
        super(props);

        this.state = {selectedIndex: 0};
        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        let tabsList = React.Children.map(this.props.children, (child, i) => {
            let activeClass = (this.state.selectedIndex === i) ? 'active' : '';
            let tabsControlProps = {
                label: child.props.label,
                controlIndex: i,
                cssClass: activeClass,
                onSelect: this.onSelect
        };

            return <TabsControlStyled {...tabsControlProps} />;
        });

        let content = React.Children.map(this.props.children, (child, i) => {
            let activeClass = (this.state.selectedIndex === i) ? 'active' : '';
            let tabClass = ['tab', activeClass].join(' ');

            return <div styleName={tabClass}>{child}</div>;
        });

        return (<div  styleName="tabs" selectedIndex={0}>
                    <div styleName="controls-holder">
                        <ul styleName="tab-controls">{tabsList}</ul>
                    </div>
                    <div styleName="tab-content">{content}</div>
                </div>);
    }

    onSelect(tabIndex){
        this.setState({selectedIndex: tabIndex});
    }
}

export default CSSModules(TabsComponent, styles, { allowMultiple: true });