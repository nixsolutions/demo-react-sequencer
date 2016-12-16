import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Indicator from './indicator/Indicator';

class Controller extends Component {
    state = {};

    static defaultProps = { 
        value: 0,
        startAngle: 40,
        endAngle: 320,
        zeroAngle: 90,
        size: 40,
    };

    componentWillMount() {
        this.fullDegs = this.props.endAngle - this.props.startAngle;
        this.degValue = this.fullDegs / 100;
        this.center = this.props.size / 2;

        this.setValue(this.props.value);
    }

    componentWillReceiveProps(props) {
        if (props.value !== this.props.value) {
            this.setValue(props.value);
        }
    }

    render() {
        let indicatorSize = parseInt(this.props.size) + 6;

        let commonStyles = {
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size
        };

        let styles = { 
            transform: `translate(-50%, -50%) rotate(${this.state.deg}deg)`
        };

        return (
            <div styleName="controller-block">
                <div styleName="indicator-holder">
                    <Indicator value={this.props.value}
                            startAngle={this.props.startAngle}
                            endAngle={this.props.endAngle}
                            zeroAngle={this.props.zeroAngle}
                            size={indicatorSize}/>
                </div>
                <div styleName="controller-wrapper"
                    onMouseDown={this.onMouseDown.bind(this)}
                    onMouseMove={this.onMouseMove.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}
                    onMouseLeave={this.onMouseUp.bind(this)}
                    style={commonStyles}>
                    <div styleName="controller-holder">
                        <div styleName="controller"
                            style={styles}></div>
                    </div>
                </div>
            </div>
        );
    }

    getCoord(e) {
        let {offsetX, offsetY, layerX, layerY} = e.nativeEvent;

        let x = offsetX || layerX;
        let y = offsetY || layerY;

        return { x, y };
    }

    getDeg(pointer) {
        let x = pointer.x - this.center;
        let y = pointer.y - this.center;
        let deg = Math.atan(y / x) * 180 / Math.PI;

        if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
            deg += 90;
        } else {
            deg += 270;
        }

        let finalDeg = Math.min(Math.max(this.props.startAngle, deg), this.props.endAngle);
        return finalDeg;
    }

    onMouseDown(e) {
        e.preventDefault();

        let pointer = this.getCoord(e);
        let deg = this.getDeg(pointer);
        this.updateValue(deg);
        this.setState({
            down: true
        });
    }

    onMouseMove(e) {
        e.preventDefault();

        if (!this.state.down) {
            return;
        }
        let pointer = this.getCoord(e);
        let deg = this.getDeg(pointer);
        this.updateValue(deg);
    }

    onMouseUp(e) {
        e.preventDefault();

        this.setState({
            down: false
        });
    }

    getValue(deg) {
        return Math.round((deg - this.props.startAngle) / this.degValue);
    }

    setValue(value) {
        let processedValue = Math.max(0, Math.min(value || 0, 100));
        let deg = Math.round(this.degValue * processedValue) + this.props.startAngle;

        this.setState({deg, value: processedValue});
    }

    updateValue(deg) {
        let value = this.getValue(deg);
        this.setState({ deg, value });

        this.props.onChange && this.props.onChange(value);
    }
}

Controller.propTypes = {
    value: function (props, propName, componentName) {
        let value = props[propName];
        if (value < 0 || value > 100) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    size: PropTypes.string,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    zeroAngle: PropTypes.number,
    onChange: PropTypes.func
};

export default CSSModules(Controller, styles, { allowMultiple: true });