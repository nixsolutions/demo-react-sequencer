import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Step extends Component {
    render() {
        let {active, isEven, isHighlighted} = this.props;
        let evenClass = isEven ? 'even' : '';
        let highlightClass = isHighlighted ? 'highlight' : '';
        let activeClass = active ? 'active' : '';
        let className = ['step', evenClass, activeClass, highlightClass].join(' ');

        return <div styleName={className}></div>
    }

    onClick(){
        this.props.onToggle && this.props.onToggle()
    }
}

Step.propTypes = {
    active: PropTypes.bool,
    isEven: PropTypes.bool,
    isHighlighted: PropTypes.bool,
};

export default CSSModules(Step, styles, {allowMultiple: true});