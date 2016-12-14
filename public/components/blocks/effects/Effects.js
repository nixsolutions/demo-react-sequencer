import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Effect from './effect/Effect';
import ScrollableBlock from 'components/common/scrollableBlock/ScrollableBlock';

import Modal from 'components/common/modal/Modal';

class Effects extends Component {
    state = {isModalOpen: false};

    render() {
        let effects = (this.props.effects || []).map((effect, i) => {
            return <div key={effect.id}>
                        <Effect
                        effect={effect}
                        remove={this.showModal.bind(this)}
                        toggleMute={this.props.toggleMute}
                        changeWet={this.props.changeWet}
                        changeSetting={this.props.changeSetting}/>
                        <Modal
                            onRequestClose={this.closeModal.bind(this)}
                            contentLabel="Modal"
                            title='Are you sure ?'
                            isOpen={this.state.isModalOpen}
                            buttons={[
                                { title: 'Yes', click: this.removeEffect.bind(this, effect) },
                                { title: 'No', click: this.closeModal.bind(this) }
                            ]}>
                            <div>"You want to delete an effect ?"</div>
                        </Modal>
                    </div>
        });

        return <ScrollableBlock>
                    <div styleName="effects">{effects}</div>
                </ScrollableBlock>
    }

    toggleMute(){
        this.props.toggleMute(this.props.effect);
    }

    removeEffect(effect){
        this.props.remove(effect.id);
        this.closeModal();
    }

    showModal(){
        this.setState({isModalOpen: true});
    }

    closeModal(){
        this.setState({isModalOpen: false});
    }

    changeWet(percents){
        this.props.changeWet(this.props.effect, percents);
    }

    changeSetting(setting, percents){
        this.props.changeSetting(setting, this.props.effect, percents);
    }
};

Effects.propTypes = {
    effects: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        wet: PropTypes.number,
        active: PropTypes.bool,
        settings: PropTypes.object,
    })),
    remove: PropTypes.func,
    toggleMute: PropTypes.func,
    changeWet: PropTypes.func,
    changeSetting: PropTypes.func,
}

export default CSSModules(Effects, styles, {allowMultiple: true});