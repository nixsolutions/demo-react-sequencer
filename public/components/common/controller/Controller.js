import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Indicator from './indicator/Indicator';

class Controller extends Component {
    state = {};

    static defaultProps = { 
        value: 0,
        startAngle: 40,
        minAngle: 40,
        maxAngle: 320,
        zeroAngle: 90,
        size: 40,
    };

    componentWillMount() {
        this.fullDegs = this.props.maxAngle - this.props.minAngle;
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
                            minAngle={this.props.minAngle}
                            maxAngle={this.props.maxAngle}
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

        let finalDeg = Math.min(Math.max(this.props.minAngle, deg), this.props.maxAngle);
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
        let diff = deg - this.props.startAngle;
        let degValue = this.getDegValue(diff);

        return Math.round(diff / Math.abs(degValue));
    }

    setValue(value) {
        let degValue = this.getDegValue(value);
        let deg = Math.round(Math.abs(degValue) * value) + this.props.startAngle;

        this.setState({deg, value});
    }

    getDegValue(diff){
        let isPositive = diff >= 0;
        return isPositive ? (this.props.maxAngle - this.props.startAngle) / 100 :
                            (this.props.minAngle - this.props.startAngle) / 100;
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
        if (value < -100 || value > 100) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    size: PropTypes.string,
    startAngle: PropTypes.number,
    minAngle: PropTypes.number,
    maxAngle: PropTypes.number,
    zeroAngle: PropTypes.number,
    onChange: PropTypes.func
};

export default CSSModules(Controller, styles, { allowMultiple: true });