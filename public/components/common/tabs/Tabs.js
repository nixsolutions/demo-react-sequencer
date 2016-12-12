import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class TabsComponent extends Component {
    constructor(props){
        super(props);

        this.state = {selectedIndex: 0};
    }

    render() {
        let tabsList = React.Children.map(this.props.children, (child, i) => {
            let activeClass = (this.state.selectedIndex === i) ? 'active' : '';

            return <li styleName={activeClass} 
                        onClick={this.onSelect.bind(this, i)}>
                        {child.props.label}
                    </li>;
        });

        let content = React.Children.map(this.props.children, (child, i) => {
            let activeClass = (this.state.selectedIndex === i) ? 'active' : '';
            let tabClass = ['tab', activeClass].join(' ');

            return <div styleName={tabClass}>{child}</div>;
        });

        return (<div  styleName="tabs" selectedIndex={0}>
                    <ul styleName="tab-controls">{tabsList}</ul>
                    <div styleName="tab-content">{content}</div>
                </div>);
    }

    onSelect(tabIndex){
        this.setState({selectedIndex: tabIndex});
    }
}

TabsComponent.propTypes = {
    children: PropTypes.node,
    selectedIndex: PropTypes.number,
};

export default CSSModules(TabsComponent, styles, { allowMultiple: true });