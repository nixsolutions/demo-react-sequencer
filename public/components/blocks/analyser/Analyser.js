import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Analyser extends Component {
    constructor(props, state){
        super(props, state);
    }

    componentDidMount(){
        this.analyserContext = this.refs.canvas.getContext("2d")
        this.loop();
    }

    render() {
        return <div styleName="analyser"><canvas width="200" height="100" ref="canvas"></canvas></div>;
    }

    drawAnalyser(values){
        let canvasWidth = 200;
        let canvasHeight = 100;

        this.analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        var barWidth = canvasWidth / this.props.analyser.size;
        for (var i = 0, len = values.length; i < len; i++){
            var val = values[i] / 255;
            var x = canvasWidth * (i / len);
            var y = val * canvasHeight;
            this.analyserContext.fillStyle = "rgba(0, 0, 0, " + val + ")";
            this.analyserContext.fillRect(x, canvasHeight - y, barWidth, canvasHeight);
        }
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
    analyser: PropTypes.object
};

export default CSSModules(Analyser, styles, {allowMultiple: true});