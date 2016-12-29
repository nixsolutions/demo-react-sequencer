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
        lineWidth: 2,
        indicationColor: '#83cec3',
        unfillerColor: '#000',
    }

    componentDidMount(){
        this.canvasContext = this.refs.canvas.getContext("2d");
        this.draw(this.props.value);
    }

    componentWillReceiveProps(props){
        this.draw(props.value);
    }

    render() {
        return <canvas width={this.props.size}
                        height={this.props.size}
                        ref="canvas"></canvas>;
    }

    draw(value){
        let valueDegrees = this.calculateDegrees(value);

        this.clear();

        this.canvasContext.beginPath();
        
        this.drawUnfilled();
        this.drawIndication(valueDegrees);
    }

    drawUnfilled(){
        let center = (this.props.size / 2);
        let radius = (this.props.size - this.props.lineWidth) / 2;

        this.canvasContext.lineWidth = this.props.lineWidth;
        this.canvasContext.strokeStyle = this.props.unfillerColor;

        this.canvasContext.beginPath();
        this.canvasContext.arc(center, center, radius, this.processDegrees(this.props.minAngle), this.processDegrees(this.props.maxAngle));
        this.canvasContext.stroke();
    }

    drawIndication(valueDegrees){
        let center = (this.props.size / 2);
        let radius = (this.props.size - this.props.lineWidth) / 2;
        let counterClockwise = valueDegrees < 0;

        this.canvasContext.lineWidth = this.props.lineWidth;
        this.canvasContext.strokeStyle = this.props.indicationColor;

        this.canvasContext.beginPath();
        this.canvasContext.arc(center, center, radius, this.processDegrees(this.props.startAngle), this.processDegrees(valueDegrees), counterClockwise);
        this.canvasContext.stroke();
    }

    clear(){
        this.canvasContext.clearRect(0, 0, this.props.size, this.props.size);
    }

    degreesToRadians(degrees){
        return (Math.PI / 180) * degrees;
    }

    processDegrees(degrees){
        return this.degreesToRadians(this.props.zeroAngle + degrees);
    }

    calculateDegrees(value){
        let fullAngle = value >= 0 ? this.props.maxAngle - this.props.startAngle : this.props.minAngle - this.props.startAngle;
        let percentWeight = Math.abs(fullAngle / 100);

        return percentWeight * value + this.props.startAngle;
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