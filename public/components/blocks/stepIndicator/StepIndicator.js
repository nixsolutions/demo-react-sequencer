import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class StepIndicator extends Component {
    static defaultProps = {
        stepsAmount: 16,
        activeIndex: -1,
    };

    render() {
        let items = [];

        for(let i = 0; this.props.stepsAmount > i; i++){
            let className = (i === this.props.activeIndex) ? 'active' : '';
            let item = <li styleName={className}></li>;

            items.push(item);
        }

        return <ul styleName="step-indicator">{items}</ul>;
    }
}

StepIndicator.propTypes = {
    activeIndex: PropTypes.number,
    stepsAmount: PropTypes.number,
};

export default CSSModules(StepIndicator, styles, {allowMultiple: true});