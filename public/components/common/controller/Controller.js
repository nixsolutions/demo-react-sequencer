import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class Controller extends Component {
    static defaultProps() {
        return { value: 0 };
    }

    constructor(props, state) {
        super(props, state);
        this.state = {};
        this.step = 10;
        this.center = 40;
        this.startAngle = 40;
        this.endAngle = 320;

        this.fullDegs = this.endAngle - this.startAngle;
        this.degValue = this.fullDegs / 100;
        this.size = this.props.size || 40;

        this.center = this.size / 2;
    }

    componentWillMount() {
        this.setValue(this.props.value);
    }

    componentWillReceiveProps(props) {
        if (props.value !== this.props.value) {
            this.setValue(props.value);
        }
    }

    render() {
        let commonStyles = {
            width: this.size,
            height: this.size,
            borderRadius: this.size
        };

        let styles = { 
            transform: `translate(-50%, -50%) rotate(${this.state.deg}deg)`
        };

        return (
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
        );
    }

    getCoord(e) {
        let {offsetX, offsetY, layerX, layerY} = e.nativeEvent;

        let x = offsetX || layerX;
        let y = offsetY || layerY;

        return { x, y };
    }

    getStep(deg) {
        let diff = this.startAngle % this.step;
        let step = deg - deg % this.step + diff;
        return step;
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

        let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
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
        return Math.round((deg - this.startAngle) / this.degValue);
    }

    setValue(value) {
        let processedValue = value || 0;

        if(processedValue < 0) { processedValue = 0; }
        if(processedValue > 100) { processedValue = 100; }

        let deg = Math.round(this.degValue * processedValue) + this.startAngle;

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
    size: PropTypes.number,
    onChange: PropTypes.func
};

export default CSSModules(Controller, styles, { allowMultiple: true });