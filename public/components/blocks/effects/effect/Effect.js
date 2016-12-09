import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Controller from 'components/common/controller/Controller';


class Effect extends Component {
    render() {
        let {effect} = this.props;
        let settingsTypes = Object.keys(effect.settings);

        let settings = settingsTypes.map((type, i) => {
            let item = effect.settings[type];

            return <div key={i} styleName="block">
                    <span styleName="label">{item.label}</span>
                    <Controller value={item.value} 
                        onChange={this.changeSetting.bind(this, type)}/>
                </div>
        })
        return <div styleName="effect">
            <div styleName="head">
                <span styleName="name">{effect.label}</span>
                <span styleName="remove" onClick={this.remove.bind(this)}>x</span>
            </div>
            <div styleName="content">
                <span styleName={`mute ${effect.active ? 'active' : ''}`} 
                    onClick={this.toggleMute.bind(this)}></span>
                <div styleName="block">
                    <span styleName="label">Dry / Wet</span>
                    <Controller value={effect.wet} 
                            onChange={this.changeWet.bind(this)}/>
                </div>
                <span styleName="separator"></span>
                {settings}
            </div>

        </div>
    }

    toggleMute(){
        this.props.toggleMute(this.props.effect.id);
    } 

    remove(){
        this.props.remove(this.props.effect.id);
    }

    changeWet(percents){
        this.props.changeWet(percents, this.props.effect.id);
    }

    changeSetting(setting, percents){
        this.props.changeSetting(setting, percents, this.props.effect.id);
    } 
};

Effect.propTypes = {
    effect: PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        wet: PropTypes.number,
        active: PropTypes.bool,
        settings: PropTypes.object,
    }),
    remove: PropTypes.func,
    toggleMute: PropTypes.func,
    changeWet: PropTypes.func,
    changeSetting: PropTypes.func,
}

export default CSSModules(Effect, styles, {allowMultiple: true});