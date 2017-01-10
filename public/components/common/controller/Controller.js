import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Indicator from './indicator/Indicator';

class Controller extends Component {
    static propTypes = {
        value: function(props, propName, componentName) {
            let value = props[propName];
            if (value < -100 || value > 100) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. Validation failed.'
                );
            }
        },
        size: PropTypes.number,
        startAngle: PropTypes.number,
        minAngle: PropTypes.number,
        maxAngle: PropTypes.number,
        zeroAngle: PropTypes.number,
        onChange: PropTypes.func
    };

    static defaultProps = {
        value: 0,
        startAngle: 40,
        minAngle: 40,
        maxAngle: 320,
        zeroAngle: 90,
        size: 40,
    };

    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        window.addEventListener('mousemove', this.onMouseMove);
    }

    state = {down: false};

    componentWillMount() {
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

        let {value, startAngle, minAngle, maxAngle, zeroAngle} = this.props;

        let indicatorProps = {
            value,
            startAngle,
            minAngle,
            maxAngle,
            zeroAngle,
            size: indicatorSize
        };

        let controllerWrapperProps = {
            styleName: 'controller-wrapper',
            style: commonStyles,
            onMouseDown: this.onMouseDown,
        };

        return (
            <div styleName="controller-block">
                <div styleName="indicator-holder">
                    <Indicator {...indicatorProps}/>
                </div>
                <div {...controllerWrapperProps}>
                    <div styleName="controller-holder">
                        <div styleName="controller"
                             style={styles}
                             ref="controller"></div>
                    </div>
                </div>
            </div>
        );
    }

    getCoord(e) {
        let {clientX, clientY} = e;

        let x = clientX;
        let y = clientY;

        return {x, y};
    }

    getDeg(pointer) {
        const center = this.getCenter();
        const x = pointer.x - center.x;
        const y = pointer.y - center.y;

        let deg = Math.atan(y / x) * 180 / Math.PI;

        if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
            deg += 90;
        } else {
            deg += 270;
        }

        let finalDeg = Math.min(Math.max(this.props.minAngle, deg), this.props.maxAngle);
        return finalDeg;
    }

    getCenter(){
        const rect = this.refs.controller.getBoundingClientRect();
        const x = rect.left + (rect.width / 2);
        const y = rect.top + (rect.height / 2);

        return { x, y };
    }

    onMouseDown(e) {
        e.preventDefault();

        let pointer = this.getCoord(e);
        let deg = this.getDeg(pointer);
        this.updateValue(deg);
        this.setState({
            down: true
        });

        window.addEventListener('mouseup', this.onMouseUp);
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

        if (!this.state.down) {
            return;
        }
        console.log('mouseup')
        this.setState({
            down: false
        });

        window.removeEventListener('mouseup', this.onMouseUp);
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

    getDegValue(diff) {
        let isPositive = diff >= 0;
        return isPositive ? (this.props.maxAngle - this.props.startAngle) / 100 :
            (this.props.minAngle - this.props.startAngle) / 100;
    }

    updateValue(deg) {
        let value = this.getValue(deg);
        this.setState({deg, value});

        this.props.onChange && this.props.onChange(value);
    }
}

export default CSSModules(Controller, styles, {allowMultiple: true});