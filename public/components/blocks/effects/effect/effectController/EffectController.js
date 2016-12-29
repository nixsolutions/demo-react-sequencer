import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Controller from 'components/common/controller/Controller';


class EffectController extends PureComponent {
    static propTypes = {
        value: PropTypes.number,
        label: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    };

    render() {
        let {value, label} = this.props;

        let controllerProps = {
            value,
            onChange: this.onChange
        };

        return (
            <div styleName="effect-controller">
                <span styleName="label">{label}</span>
                <Controller {...controllerProps} />
            </div>
        );
    }

    onChange(value){
        this.props.onChange(value, this.props.type);
    }
};

export default CSSModules(EffectController, styles, { allowMultiple: true });