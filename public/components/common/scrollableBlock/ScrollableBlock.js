import styles from './styles.less';
import { Scrollbars } from 'react-custom-scrollbars';
import CSSModules from 'react-css-modules';
import React, {PureComponent, PropTypes} from 'react';

class ScrollableBlock extends PureComponent {
  render() {
    let thumbCss = this.props.styles['thumb-vertical'];

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
        renderThumbVertical={props => <div {...props} className={thumbCss}/>}
        {...this.props}>
        </Scrollbars>
    );
  }
};
 
export default CSSModules(ScrollableBlock, styles);