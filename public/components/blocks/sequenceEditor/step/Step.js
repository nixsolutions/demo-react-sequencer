import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Step extends Component {
    render() {
        let {active, isEven} = this.props;
        let evenClass = isEven ? 'even' : '';
        let activeClass = active ? 'active' : '';
        let className = ['step', evenClass, activeClass].join(' ');

        return <div styleName={className}></div>
    }
}

Step.propTypes = {
    active: PropTypes.bool,
    isEven: PropTypes.bool
};

export default CSSModules(Step, styles, {allowMultiple: true});