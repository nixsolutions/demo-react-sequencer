import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';
import Slider from 'components/common/slider/Slider';
import Indicator from './indicator/Indicator';

class VolumeConroller extends PureComponent {
    static defaultProps = {
        width: 100,
        height: 30
    };

    render() {
        return <div styleName="volume-controller">
                    <span styleName="mute-icon"></span>
                    <div styleName="holder">
                        <div styleName="indicator"><Indicator value={this.props.value}/></div>
                        <div><Slider value={this.props.value} onChange={this.props.onChange} styleMode="large"/></div>
                    </div>
                    <span styleName="loud-icon"></span>
                </div>;
    }
}

VolumeConroller.propTypes = {
    value: PropTypes.number,
};

export default CSSModules(VolumeConroller, styles, {allowMultiple: true});