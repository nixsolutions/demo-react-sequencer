import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';

class Indicator extends Component {
    static defaultProps = {
        value: 0,
        amount: 10,
        initItemHeight: 2,
        increaseValue: 2
    }

    render() {
        let items = [];

        for(let i = 0; items.length < this.props.amount; i++){
            let className = this.isActiveItem(i) ? 'active' : '';
            items.push(<li key={i} 
                        styleName={className}
                        style={{height: this.getItemHeight(i)}}></li>);
        };

        return <ul styleName="indicator">{items}</ul>;
    }

    isActiveItem(itemIndex){
        let ITEM_WEIGHT = 100 / this.props.amount;
        let itemValue = itemIndex * ITEM_WEIGHT;

        return this.props.value > itemValue;
    }

    getItemHeight(itemIndex){
        let {initItemHeight, increaseValue} = this.props;
        return initItemHeight + (increaseValue * itemIndex);
    }
}

Indicator.propTypes = {
    value: PropTypes.number,
    amount: PropTypes.number,
    initItemHeight: PropTypes.number,
    increaseValue: PropTypes.number,
};

export default CSSModules(Indicator, styles, {allowMultiple: true});