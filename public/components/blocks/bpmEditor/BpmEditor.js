import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class BpmEditor extends Component {
    render() {
        return (
            <div styleName="bpm-editor">
                <span styleName="title">BPM </span>
                <input type="text" 
                        onChange={this.onChange.bind(this)} 
                        value={this.props.value}
                        maxLength="3"
                        ref="bpmInput"/>
            </div>
        );
    }

    onChange(){
        let value = parseInt(this.refs.bpmInput.value) || 1;
        this.props.onChange(value);
    }
}

BpmEditor.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
};

export default CSSModules(BpmEditor, styles, {allowMultiple: true});