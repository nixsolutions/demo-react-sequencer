import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Controller from 'components/common/controller/Controller';
import EffectController from './effectController/EffectController';


class Effect extends Component {
    static propTypes = {
        effect: PropTypes.shape({
            id: PropTypes.number,
            label: PropTypes.string,
            wet: PropTypes.number,
            active: PropTypes.bool,
            settings: PropTypes.object,
        }),
        toggleMute: PropTypes.func,
        changeWet: PropTypes.func,
        changeSetting: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.toggleMute = this.toggleMute.bind(this);
        this.changeWet = this.changeWet.bind(this);
        this.changeSetting = this.changeSetting.bind(this);
    };

    render() {
        let {effect} = this.props;
        let settingsTypes = Object.keys(effect.settings);

        let settings = settingsTypes.map((type, i) => {
            let item = effect.settings[type];
            let {label, value} = item;
            let effectControllerProps = {
                type,
                label,
                value,
                onChange: this.changeSetting
            };

            return (
                <div key={i} styleName="block">
                    <EffectController {...effectControllerProps}/>
                </div>
            );
        });

        let muteProps = {
            styleName: `mute ${effect.active ? 'active' : ''}`,
            title: `${effect.active ? 'mute' : 'activate'}`,
            onClick: this.toggleMute
        };

        let dryWetProps = {
            label: 'Dry / Wet',
            value: effect.wet,
            onChange: this.changeWet
        };

        return (
            <div styleName="effect-holder">
                <div styleName={`effect ${effect.active ? 'active' : ''}`}>
                    <div styleName="head">
                        <span styleName="separator"></span>
                        <span styleName="name">{effect.label}</span>
                        <span styleName="separator"></span>
                    </div>
                    <div styleName="content">
                        <span {...muteProps}></span>
                        <div styleName="block">
                            <EffectController {...dryWetProps}/>
                        </div>
                        <span styleName="separator"></span>
                        {settings}
                    </div>
                </div>
            </div>
        );
    }

    toggleMute() {
        this.props.toggleMute(this.props.effect.id);
    }

    changeWet(percents) {
        this.props.changeWet(percents, this.props.effect.id);
    }

    changeSetting(percents, settingType) {
        this.props.changeSetting(settingType, percents, this.props.effect.id);
    }
}
;

export default CSSModules(Effect, styles, {allowMultiple: true});