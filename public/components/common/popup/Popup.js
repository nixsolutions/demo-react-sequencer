import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Popup from 'react-popup';

class PopupComponent extends Popup {
    static show(options, noQueue) {
        if (noQueue) {
            return this.register(options);
        }

        let positionClass = options.position ? 'positioned' : '';

        return this.create(Object.assign({}, options, {className: positionClass}));
    }

    render() {
        let popup;

        if(this.state.visible){
            let overlay = !this.state.noOverlay ? <div styleName="popup-overlay" onClick={this.onClose}></div> : '';
            let head = <div styleName="head">
                        <span styleName="title">{this.state.title}</span>
                        <span  styleName="close" onClick={this.onClose}>x</span> 
                    </div>;

            let buttons = (this.state.buttons || []).map((button, i) => {
                return <button key={i} onClick={button.click.bind(this)} 
                                styleName="button">{button.title}</button>;
            });

            let buttonsBlock = buttons.length ? <div styleName="buttons">{buttons}</div> : '';
            let popupClass = ['popup', this.state.className].join(' ');

            popup = <div styleName="popup-holder">
                        {overlay}
                        <div styleName={popupClass}  ref="box">
                            {head}
                            <div styleName='content'>{this.state.content}</div>
                            {buttonsBlock}
                        </div>
                    </div>
        }

        return <div>{popup}</div>
    }
}

PopupComponent.propTypes = {

};

export default CSSModules(PopupComponent, styles, {allowMultiple: true});