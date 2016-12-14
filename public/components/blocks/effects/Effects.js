import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Effect from './effect/Effect';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

import Popup from 'components/common/popup/Popup';

class Effects extends Component {
    render() {
        let effects = (this.props.effects || []).map((effect, i) => {
            return <Effect key={i} 
                        effect={effect}
                        remove={this.onRemoveClick.bind(this)}
                        toggleMute={this.props.toggleMute}
                        changeWet={this.props.changeWet}
                        changeSetting={this.props.changeSetting}/>
        });

        return <ScrollableBlock>
                    <div styleName="effects">{effects}</div>
                </ScrollableBlock>
    }

    toggleMute(){
        this.props.toggleMute(this.props.effect);
    } 

    onRemoveClick(effect){
        let {remove} = this.props;

        Popup.show({
            title: 'Are you sure ?',
            content: "You want to delete an effect ?",
            buttons: [
                {
                    title: 'Yes',
                    click: function() {
                        remove(effect);
                        this.onClose();
                    }
                },
                {
                    title: 'No',
                    click: function(){
                        this.onClose();
                    }
                }
            ]
        });
    }

    changeWet(percents){
        this.props.changeWet(this.props.effect, percents);
    }

    changeSetting(setting, percents){
        this.props.changeSetting(setting, this.props.effect, percents);
    }
};

Effects.propTypes = {
    effects: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        wet: PropTypes.number,
        active: PropTypes.bool,
        settings: PropTypes.object,
    })),
    remove: PropTypes.func,
    toggleMute: PropTypes.func,
    changeWet: PropTypes.func,
    changeSetting: PropTypes.func,
}

export default CSSModules(Effects, styles, {allowMultiple: true});