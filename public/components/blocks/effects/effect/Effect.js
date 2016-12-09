import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Controller from 'components/common/controller/Controller';


class Effect extends Component {
    render() {
        let {effect} = this.props;

        let settings = effect.settings.map((item, i) => {
            return <div key={i} styleName="block">
                    <span styleName="label">{item.label}</span>
                    <Controller value={item.value} 
                        onChange={this.changeSetting.bind(this, item)}/>
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
        this.props.toggleMute(this.props.effect);
    } 

    remove(){
        this.props.remove(this.props.effect);
    }

    changeWet(percents){
        this.props.changeWet(this.props.effect, percents);
    }

    changeSetting(setting, percents){
        this.props.changeSetting(setting, this.props.effect, percents);
    } 
};

Effect.propTypes = {
    effect: PropTypes.shape({
        label: PropTypes.string,
        wet: PropTypes.number,
        active: PropTypes.bool,
        settings: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.number,
        })),
    }),
    remove: PropTypes.func,
    toggleMute: PropTypes.func,
    changeWet: PropTypes.func,
    changeSetting: PropTypes.func,
}

export default CSSModules(Effect, styles, {allowMultiple: true});