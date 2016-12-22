import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Effect from './effect/Effect';

class Effects extends Component {
    state = {isModalOpen: false};

    render() {
        let effects = (this.props.effects || []).map((effect, i) => {
            let effectProps = {
                key: effect.id,
                effect,
                remove: this.showModal.bind(this),
                toggleMute: this.props.toggleMute,
                changeWet: this.props.changeWet,
                changeSetting: this.props.changeSetting
            }

            return <Effect {...effectProps}/>
        });

        return <div styleName="effects">{effects}</div>
    }

    toggleMute(){
        this.props.toggleMute(this.props.effect);
    }

    removeEffect(effect){
        this.props.remove(effect.id);
        this.closeModal();
    }

    showModal(){
        this.setState({isModalOpen: true});
    }

    closeModal(){
        this.setState({isModalOpen: false});
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