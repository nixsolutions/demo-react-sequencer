import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Analyser extends Component {
    static defaultProps = {
        width: 300,
        height: 130,
        segmentsInStack: 20,
        gridColor: '#f26522',
    };

    componentWillReceiveProps(props){
        if(props.analyser && !this.analyserContext){
            this.padding = 2;
            this.startChanalValue = 150;
            this.colorIncreaseStep = 10;
            this.segmentWeight = 255 / this.props.segmentsInStack;
            this.segmentWidth = (this.props.width / props.analyser.size) - this.padding;
            this.segmentHeight = (this.props.height / this.props.segmentsInStack) - this.padding;

            this.analyserContext = this.refs.canvas.getContext("2d");

            this.loop();
        }
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height
        };

        return <div styleName="analyser" style={style}>
                    <canvas width={this.props.width}
                            height={this.props.height}
                            ref="canvas"></canvas>
                </div>;
    }

    draw(values){
        this.clear();
        this.drawSegments(values);
        this.drawGrid();
    }

    clear(){
        this.analyserContext.clearRect(0, 0, this.props.width, this.props.height);
    }

    drawSegments(values){
        values.forEach((value, i) => {
            let activeSegmentsAmount = value / this.segmentWeight;

            for(let j = 0; activeSegmentsAmount > j; j++){
                this.drawSegment(i, j);
            }
        });
    }

    drawSegment(colIndex, indexInStack){
        let chanalValue = this.startChanalValue + (this.colorIncreaseStep * indexInStack);
        let x = (this.segmentWidth * colIndex) + (colIndex * this.padding);
        let y = this.props.height - ((indexInStack - 1) * this.segmentHeight) - (indexInStack * this.padding);

        this.analyserContext.fillStyle = `rgb(243, ${chanalValue}, 55)`;
        this.analyserContext.fillRect(x, y, this.segmentWidth, this.segmentHeight);
    }

    drawGrid(){
        this.drawVerticalGridLines();
        this.drawHorizontalGridLines();
    }

    drawVerticalGridLines(){
        for(let i = 0; this.props.analyser.size > i; i++){
            let segmentCellXFrom = (this.segmentWidth + this.padding) * i + 0.5;
            let segmentCellXTo = segmentCellXFrom + this.segmentWidth;

            this.drawGridLine(segmentCellXFrom, 0, segmentCellXFrom, this.props.height);
            this.drawGridLine(segmentCellXTo, 0, segmentCellXTo, this.props.height);
        }
    }

    drawHorizontalGridLines(){
        for(let i = 0; this.props.segmentsInStack > i; i++){
            let segmentCellYFrom = this.props.height - ((this.segmentHeight + this.padding) * i) + 0.5;
            let segmentCellYTo = segmentCellYFrom + this.segmentHeight;

            this.drawGridLine(0, segmentCellYFrom, this.props.width, segmentCellYFrom);
            this.drawGridLine(0, segmentCellYTo, this.props.width, segmentCellYTo);
        }
    }

    drawGridLine(fromX, fromY, toX, toY){
        this.analyserContext.strokeStyle = this.props.gridColor;
        this.analyserContext.beginPath();
        this.analyserContext.moveTo(fromX, fromY);
        this.analyserContext.lineTo(toX, toY);
        this.analyserContext.stroke();
    }

    loop(){
        requestAnimationFrame(this.loop.bind(this));

        if(this.props.analyser){
            var analyserValues = this.props.analyser.analyse();
            this.draw(analyserValues);
        }
    }
}

Analyser.propTypes = {
    analyser: PropTypes.object,
    segmentsInStack: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    gridColor: PropTypes.string,
};

export default CSSModules(Analyser, styles, {allowMultiple: true});