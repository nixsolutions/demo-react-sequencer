import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Popup from 'react-popup';

class PopupComponent extends Popup {
    static show(options, noQueue) {
        if (noQueue) {
            return this.register(options);
        }

        return this.create(options);
    }

    render() {
        let popup;

        if(this.state.visible){
            let head = <div styleName="head">
                        <span styleName="title">{this.state.title}</span>
                        <span  styleName="close" onClick={this.onClose}>x</span> 
                    </div>;

            let buttons = this.state.buttons.map((button, i) => {
                return <button key={i} onClick={button.click.bind(this)} 
                                styleName="button">{button.title}</button>;
            });

            popup = <div styleName="popup-holder">
                        <div styleName="popup-overlay" onClick={this.onClose}></div>
                        <div styleName='popup'>
                            {head}
                            <div styleName='content'>{this.state.content}</div>
                            <div styleName="buttons">{buttons}</div>
                        </div>
                    </div>
        }

        return <div>{popup}</div>
    }
}

PopupComponent.propTypes = {

};

export default CSSModules(PopupComponent, styles, {allowMultiple: true});