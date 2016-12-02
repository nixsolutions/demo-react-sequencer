import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import ReactSlider from 'react-slider';

class Slider extends Component {
    render() {
        return <ReactSlider  styleName="slider" defaultValue={70} {...this.props}>
                <div styleName="handler"></div>
            </ReactSlider>
    }
}

Slider.propTypes = {

};

export default CSSModules(Slider, styles, {allowMultiple: true});