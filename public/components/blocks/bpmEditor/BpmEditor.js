import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class BpmEditor extends Component {
    render() {
        let inputProps = {
            type: "text",
            onChange: this.onChange.bind(this), 
            onKeyDown: this.onKeyDown,
            value: this.props.value,
            maxLength: "3",
            ref: "bpmInput"
        };

        return (
            <div styleName="bpm-editor">
                <span styleName="title">BPM</span>
                <div styleName="input-holder">
                    <input {...inputProps}/>
                </div>
            </div>
        );
    }

    onKeyDown(e){
        e.nativeEvent.stopImmediatePropagation();
    }

    onChange(e){
        let value = this.refs.bpmInput.value;

        if(isNaN(Number(value)) && value !== ''){
            return false;
        }

        let processedValue = (value !== '') ? Number(value) : '';

        this.props.onChange(processedValue);
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