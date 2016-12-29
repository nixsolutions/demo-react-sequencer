import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { PureComponent, PropTypes } from 'react';

class MuteButton extends PureComponent {
    static propTypes = {
        instrumentId: PropTypes.string,
        toggleInstrument: PropTypes.func,
    };

    constructor(props){
        super(props);

        this.toggleInstrument = this.toggleInstrument.bind(this);
    }

    render() {
        let {isActive} = this.props;
        let muteClass = ['mute', isActive ? 'active' : ''].join(' ');
        let muteText = isActive ? 'disable instrument' : 'enable instrument';
    
        let muteProps = {
            styleName: muteClass,
            title: muteText,
            onClick: this.toggleInstrument
        };

        return <div {...muteProps}></div>;
    }

    toggleInstrument(){
        this.props.toggleInstrument(this.props.instrumentId);
    }
}

export default CSSModules(MuteButton, styles, { allowMultiple: true });