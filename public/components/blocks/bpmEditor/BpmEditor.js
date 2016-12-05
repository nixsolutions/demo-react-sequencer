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
        let parsedValue = parseInt(this.refs.bpmInput.value)
        let value = isNaN(parsedValue) ? '' : parsedValue;
        this.props.onChange(value);
    }
}

BpmEditor.propTypes = {
    value: function(props, propName, componentName) {
        let isNumber = typeof props[propName] === 'number';
        let isEmptyString = props[propName] === '';

        if (!isNumber && !isEmptyString)  {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    onChange: PropTypes.func
};

export default CSSModules(BpmEditor, styles, {allowMultiple: true});