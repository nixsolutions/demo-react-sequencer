import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';

class Analyser extends Component {
    static defaultProps = {
        segmentsInStack: 17,
        gridColor: 'rgba(241, 101, 34, 0.2)',
    };

    constructor(props) {
        super(props);

        this.bindedLoop = this.loop.bind(this);
    };

    componentWillReceiveProps(props) {
        if (props.analyser && !this.analyserContext) {
            this.analyserContext = this.refs.segments.getContext("2d");
            this.padding = 1;
            this.startChanalValue = 150;
            this.colorIncreaseStep = 10;
            this.segmentWidth = 10;
            this.segmentHeight = 2;
            this.segmentWeight = 255 / this.props.segmentsInStack;
            this.segmentFullWidth = this.segmentWidth + this.padding;
            this.segmentFullHeight = this.segmentHeight + this.padding;
            this.analyserSize = props.analyser.size;
            this.width = this.segmentFullWidth * this.analyserSize - this.padding;
            this.height = this.segmentFullHeight * this.props.segmentsInStack - this.padding;

            this.loop();
            setTimeout(() => this.drawGrid())
        }
    }

    render() {
        let style = {
            width: this.width,
            height: this.height
        };

        return <div styleName="analyser">
            <div styleName="analyser-holder" style={style}>
                <canvas width={this.width}
                    height={this.height}
                    ref="grid"></canvas>
                <canvas width={this.width}
                    height={this.height}
                    ref="segments"></canvas>
            </div>
        </div>;
    }

    draw(values) {
        this.clear();
        this.drawSegments(values);
    }

    clear() {
        this.analyserContext.clearRect(0, 0, this.width, this.height);
    }

    drawSegments(values) {
        values.forEach((value, i) => {
            let activeSegmentsAmount = value / this.segmentWeight;

            for (let j = 0; activeSegmentsAmount > j; j++) {
                this.drawSegment(i, j);
            }
        });
    }

    drawSegment(colIndex, indexInStack) {
        let chanalValue = this.startChanalValue + (this.colorIncreaseStep * indexInStack);
        let x = this.segmentFullWidth * colIndex;
        let y = this.height - ((indexInStack) * this.segmentFullHeight) - this.segmentHeight;

        this.analyserContext.fillStyle = `rgb(243, ${chanalValue}, 55)`;
        this.analyserContext.fillRect(x, y, this.segmentWidth, this.segmentHeight);
    }

    drawGrid() {
        this.gridContext = this.refs.grid.getContext("2d");

        this.drawVerticalGridLines();
        this.drawHorizontalGridLines();
    }

    drawVerticalGridLines() {
        for (let i = 0; this.analyserSize > i; i++) {
            let segmentCellXFrom = (this.segmentFullWidth) * i + 0.5;
            let segmentCellXTo = segmentCellXFrom + this.segmentWidth;

            this.drawGridLine(segmentCellXFrom, 0, segmentCellXFrom, this.height);
            this.drawGridLine(segmentCellXTo, 0, segmentCellXTo, this.height);
        }
    }

    drawHorizontalGridLines() {
        for (let i = 0; this.props.segmentsInStack > i; i++) {
            let segmentCellYFrom = this.height - ((this.segmentFullHeight * i) + this.padding) - 0.5;
            let segmentCellYTo = segmentCellYFrom + this.segmentHeight;

            this.drawGridLine(0, segmentCellYTo, this.width, segmentCellYTo);
        }
    }

    drawGridLine(fromX, fromY, toX, toY) {
        this.gridContext.strokeStyle = this.props.gridColor;
        this.gridContext.beginPath();
        this.gridContext.moveTo(fromX, fromY);
        this.gridContext.lineTo(toX, toY);
        this.gridContext.stroke();
    }

    loop() {
        // requestAnimationFrame(this.bindedLoop);
        setTimeout(this.bindedLoop, 50);

        if (this.props.analyser) {
            var analyserValues = this.props.analyser.analyse();
            this.draw(analyserValues);
        }
    }
}

Analyser.propTypes = {
    analyser: PropTypes.object,
    segmentsInStack: PropTypes.number,
    gridColor: PropTypes.string,
};

export default CSSModules(Analyser, styles, { allowMultiple: true });