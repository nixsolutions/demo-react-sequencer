import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';

class ModalComponent extends Component {
    static show(options, noQueue) {
        if (noQueue) {
            return this.register(options);
        }

        let positionClass = options.position ? 'positioned' : '';

        return this.create(Object.assign({}, options, {className: positionClass}));
    }

    render() {
        let head = <div styleName="head">
                    <span styleName="title">{this.props.title}</span>
                    <span  styleName="close" onClick={this.onClose}>x</span> 
                </div>;

        let buttons = (this.props.buttons || []).map((button, i) => {
            return <button key={i} 
                    onClick={button.click.bind(this)} 
                    styleName="button">{button.title}</button>;
        });

        let buttonsBlock = buttons.length ? <div styleName="buttons">{buttons}</div> : '';

        return <Modal {...this.props}>
            <div styleName="modal">
                {head}
                <div styleName='content'>{this.props.children}</div>
                {buttonsBlock}
            </div>
        </Modal>
    }
}

ModalComponent.propTypes = {
    title: PropTypes.string,
    buttons: PropTypes.array,
    children: PropTypes.node,
};

export default CSSModules(ModalComponent, styles, {allowMultiple: true});