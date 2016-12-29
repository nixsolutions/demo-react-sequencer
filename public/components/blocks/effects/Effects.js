import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {PureComponent, PropTypes} from 'react';
import Effect from './effect/Effect';

class Effects extends PureComponent {
    static propTypes = {
        effects: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            wet: PropTypes.number,
            active: PropTypes.bool,
            settings: PropTypes.object,
        })),
        toggleMute: PropTypes.func,
        changeWet: PropTypes.func,
        changeSetting: PropTypes.func,
    };

    static defaultProps = {
        effects: []
    };

    render() {
        let effects = this.props.effects.map((effect) => {
            let effectProps = {
                key: effect.id,
                effect,
                toggleMute: this.props.toggleMute,
                changeWet: this.props.changeWet,
                changeSetting: this.props.changeSetting
            };

            return <Effect {...effectProps}/>
        });

        return <div styleName="effects">{effects}</div>
    }
};

export default CSSModules(Effects, styles, {allowMultiple: true});