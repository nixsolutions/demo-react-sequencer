import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';

class Step extends PureComponent {
    static propTypes = {
        instrumentId: PropTypes.string,
        indexInSequence: PropTypes.number,
        isActive: PropTypes.bool,
        onToggleStep: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        let {isActive, indexInSequence} = this.props;
        let evenClass = this.isEven(indexInSequence) ? 'even' : '';
        let activeClass = isActive ? 'active' : '';
        let className = ['step', evenClass, activeClass].join(' ');

        return <div styleName={className} onClick={this.onClick}></div>
    }

    onClick(){
        let {indexInSequence, instrumentId} = this.props;
        this.props.onToggleStep(indexInSequence, instrumentId);
    }

    isEven(indexInSequence){
        return Math.floor(indexInSequence / 4) % 2 !== 0;
    }
}

export default CSSModules(Step, styles, {allowMultiple: true});