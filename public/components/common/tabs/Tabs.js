import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

Tabs.setUseDefaultStyles(false);

class TabsComponent extends Component {
    render() {
        let tabsList = React.Children.map(this.props.children, child => {
            return <Tab>{child.props.label}</Tab>;
        });

        let content = React.Children.map(this.props.children, child => {
            return <TabPanel styleName="tab-content">{child}</TabPanel>;
        });
        return (<Tabs onSelect={this.handleSelect} selectedIndex={0}>
                    <TabList styleName="tab-controls">{tabsList}</TabList>
                    {content}
                </Tabs>);
    }
}

TabsComponent.propTypes = {
    children: PropTypes.node
};

export default CSSModules(TabsComponent, styles, { allowMultiple: true });