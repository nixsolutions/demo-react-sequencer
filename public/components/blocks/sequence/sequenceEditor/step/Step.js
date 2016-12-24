import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Step extends Component {
    static propTypes = {
        active: PropTypes.bool,
        isEven: PropTypes.bool,
        isHighlighted: PropTypes.bool,
        index: PropTypes.number,
        note: PropTypes.number,
        onStepClick: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        let {active, isEven} = this.props;
        let evenClass = isEven ? 'even' : '';
        let activeClass = active ? 'active' : '';
        let className = ['step', evenClass, activeClass].join(' ');

        return <div styleName={className} onClick={this.onClick}></div>
    }

    onClick(){
        let {note, index} = this.props;
        this.props.onStepClick && this.props.onStepClick(note, index);
    }
}

export default CSSModules(Step, styles, {allowMultiple: true});