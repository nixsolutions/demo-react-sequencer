import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Analyser extends Component {
    static defaultProps = {
        width: 100,
        height: 30
    };

    constructor(props, state){
        super(props, state);
    }

    componentDidMount(){
        this.analyserContext = this.refs.canvas.getContext("2d");
        this.loop();
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height
        }

        return <div styleName="analyser" style={style}>
                    <canvas width={this.props.width}
                            height={this.props.height}
                            ref="canvas"></canvas>
                </div>;
    }

    drawAnalyser(values){
        let canvasWidth = this.props.width;
        let canvasHeight = this.props.height;

        this.analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        let barWidth = canvasWidth / this.props.analyser.size;

        values.forEach((value, i) => {
            let saturation = value / 255;
            let x = barWidth * i;
            let y = saturation * canvasHeight;

            this.analyserContext.fillStyle = `rgba(0, 0, 0, ${saturation})`;
            this.analyserContext.fillRect(x, canvasHeight - y, barWidth, canvasHeight);
        });
    }

    loop(){
        requestAnimationFrame(this.loop.bind(this));

        if(this.props.analyser){
            var analyserValues = this.props.analyser.analyse();
            this.drawAnalyser(analyserValues);
        }
    }
}

Analyser.propTypes = {
    analyser: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number
};

export default CSSModules(Analyser, styles, {allowMultiple: true});