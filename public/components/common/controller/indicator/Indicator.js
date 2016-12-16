import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class Indicator extends Component {
    static defaultProps = {
        size: 50,
        zeroAngle: 90,
        startAngle: 40,
        minAngle: 40,
        maxAngle: 320,
        lineWidth: 1,
        color: '#83cec3',
    }

    componentDidMount(){
        this.context = this.refs.canvas.getContext("2d");
        this.draw();
    }

    componentWillReceiveProps(){
        this.draw();
    }

    render() {
        return <canvas width={this.props.size}
                        height={this.props.size}
                        ref="canvas"></canvas>;
    }

    draw(){
        let center = (this.props.size / 2);
        let radius = (this.props.size - this.props.lineWidth) / 2;
        let valueDegrees = this.calculateDegrees(this.props.value);
        let counterClockwise = valueDegrees < 0;

        this.clear();

        this.context.beginPath();
        this.context.lineWidth = this.props.lineWidth;

        this.context.strokeStyle = this.props.color;
        this.context.arc(center, center, radius, this.processDegrees(0), this.processDegrees(valueDegrees), counterClockwise);
        this.context.stroke();
    }

    clear(){
        this.context.clearRect(0, 0, this.props.size, this.props.size);
    }

    degreesToRadians(degrees){
        return (Math.PI / 180) * degrees;
    }

    processDegrees(degrees){
        return this.degreesToRadians(this.props.zeroAngle + this.props.startAngle + degrees);
    }

    calculateDegrees(value){
        let fullAngle = value >= 0 ? this.props.maxAngle - this.props.startAngle : this.props.minAngle - this.props.startAngle;
        let percentWeight = Math.abs(fullAngle / 100);

        return percentWeight * value;
    }
}

Indicator.propTypes = {
    value: PropTypes.number,
    size: PropTypes.number,
    lineWidth: PropTypes.number,
    color: PropTypes.string,
    startAngle: PropTypes.number,
    minAngle: PropTypes.number,
    maxAngle: PropTypes.number,
    zeroAngle: PropTypes.number,
};

export default CSSModules(Indicator, styles, { allowMultiple: true });