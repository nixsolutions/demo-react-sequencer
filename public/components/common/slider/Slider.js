import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import ReactSlider from 'react-slider';

class Slider extends Component {
    static defaultProps = {
        width: 100,
        height: 20
    };

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height
        };

        let handlerStyle = {height: this.props.height};

        return <div style={style}>
                    <ReactSlider  styleName="slider" {...this.props} 
                                withBars={true} 
                                barClassName={this.props.styles.bar}>
                        <div styleName="handler-holder" style={handlerStyle}>
                            <div styleName="handler"></div>
                        </div>
                    </ReactSlider>
                </div>
    }
}

Slider.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default CSSModules(Slider, styles, {allowMultiple: true});