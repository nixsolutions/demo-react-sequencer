import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

class ModalComponent extends Component {
    static defaultProps = {mode: ''};

    static show(options, noQueue) {
        if (noQueue) {
            return this.register(options);
        }

        let positionClass = options.position ? 'positioned' : '';

        return this.create(Object.assign({}, options, { className: positionClass }));
    }

    render() {
        let head = <div styleName="head">
            <span styleName="title">{this.props.title}</span>
            <span styleName="close" onClick={this.props.onRequestClose}></span>
        </div>;

        let buttons = (this.props.buttons || []).map((button, i) => {
            return <button key={i}
                onClick={button.click.bind(this)}
                styleName="button"><span styleName="button-holder">{button.title}</span></button>;
        });

        let buttonsBlock = buttons.length ? <div styleName="buttons-holder"><div styleName="buttons">{buttons}</div></div> : '';

        const customStyles = {
            overlay: Object.assign({
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
            }, this.props.style && this.props.style.overlay),
            content: Object.assign({
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 999,
                background: 'none',
                border: 0,
                padding: 0
            }, this.props.style && this.props.style.content)
        };

        return <Modal {...this.props} style={customStyles}>
            <div styleName="modal">
                <div styleName="modal-holder">
                    {head}
                    <div styleName={`content ${this.props.mode}`}>
                        {this.props.children}
                        {buttonsBlock}
                    </div>
                </div>
            </div>
        </Modal>
    }
}

ModalComponent.propTypes = {
    title: PropTypes.string,
    buttons: PropTypes.array,
    children: PropTypes.node,
    mode: PropTypes.string,
};

export default CSSModules(ModalComponent, styles, { allowMultiple: true });