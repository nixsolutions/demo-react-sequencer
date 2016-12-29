import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';
import ReactSlider from 'react-slider';

class Slider extends PureComponent {
    static defaultProps = {
        width: 100,
        height: 20,
        styleMode: 'medium',
    };

    render() {
        let cssClass = ['slider', this.props.styleMode].join(' ');
        return <div>
                    <ReactSlider  styleName={cssClass} {...this.props} 
                                withBars={true} 
                                barClassName={this.props.styles.bar}>
                        <div styleName="handler-holder">
                            <div styleName="handler"></div>
                        </div>
                    </ReactSlider>
                </div>
    }
}

Slider.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    styleMode: PropTypes.string,
};

export default CSSModules(Slider, styles, {allowMultiple: true});