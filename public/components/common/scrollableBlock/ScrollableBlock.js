import { Scrollbars } from 'react-custom-scrollbars';
import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.less';

class ScrollableBlock extends Component {
  render() {
    return (
      <Scrollbars  
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={200}
        thumbMinSize={30}
        universal={true}
        {...this.props}>
        </Scrollbars>
    );
  }
};
 
export default CSSModules(ScrollableBlock, styles, {allowMultiple: true});