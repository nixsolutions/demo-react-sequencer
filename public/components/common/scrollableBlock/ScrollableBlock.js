import styles from './styles.less';
import { Scrollbars } from 'react-custom-scrollbars';
import CSSModules from 'react-css-modules';
import React, {Component, PropTypes} from 'react';

class ScrollableBlock extends Component {
  update(){
    this.refs.scrollbar.update();
  }
  
  render() {
    let thumbCss = this.props.styles['thumb-vertical'];

    return (
      <Scrollbars  
        autoHide={false}
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={200}
        thumbMinSize={30}
        universal={true}
        renderThumbVertical={props => <div {...props} className={thumbCss}/>}
        ref="scrollbar"
        {...this.props}>
        </Scrollbars>
    );
  }
};
 
export default CSSModules(ScrollableBlock, styles);