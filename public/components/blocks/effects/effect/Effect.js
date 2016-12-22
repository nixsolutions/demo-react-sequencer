import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Controller from 'components/common/controller/Controller';


class Effect extends Component {
    render() {
        let {effect} = this.props;
        let settingsTypes = Object.keys(effect.settings);

        let settings = settingsTypes.map((type, i) => {
            let item = effect.settings[type];
            let controllerProps = {
                value: item.value,
                onChange: this.changeSetting.bind(this, type)
            }

            return <div key={i} styleName="block">
                <span styleName="label">{item.label}</span>
                <Controller {...controllerProps} />
            </div>
        })

        let muteProps = {
            styleName: `mute ${effect.active ? 'active' : ''}`,
            onClick: this.toggleMute.bind(this)
        };

        let dryWetProps = {
            value: effect.wet,
            onChange: this.changeWet.bind(this)
        }

        return <div styleName="effect-holder">
            <div styleName={`effect ${effect.active ? 'active' : ''}`}>
                <div styleName="head">
                    <span styleName="separator"></span>
                    <span styleName="name">{effect.label}</span>
                    <span styleName="separator"></span>
                </div>
                <div styleName="content">
                    <span {...muteProps}></span>
                    <div styleName="block">
                        <span styleName="label">Dry / Wet</span>
                        <Controller {...dryWetProps} />
                    </div>
                    <span styleName="separator"></span>
                    {settings}
                </div>
            </div>
        </div>
    }

    toggleMute() {
        this.props.toggleMute(this.props.effect.id);
    }

    remove() {
        this.props.remove(this.props.effect.id);
    }

    changeWet(percents) {
        this.props.changeWet(percents, this.props.effect.id);
    }

    changeSetting(setting, percents) {
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

export default CSSModules(Effect, styles, { allowMultiple: true });