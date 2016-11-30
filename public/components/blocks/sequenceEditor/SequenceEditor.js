import CSSModules from 'react-css-modules';
import styles from './styles.less';
import React, {Component, PropTypes} from 'react';
import Step from './step/Step';

class SequenceEditor extends Component {
    render() {
        let {steps} = this.props; 
        let items = this.createSteps(steps);
        return <ul styleName="sequence-editor">{items}</ul>
    }

    createSteps(steps){
        return steps.map((step, i) => {
            let isEven = Math.floor(i / 4) % 2 !== 0;
            return <li key={i}><Step active={step.active} isEven={isEven}/></li>;
        })
    }
}

SequenceEditor.propTypes = {

};

export default CSSModules(SequenceEditor, styles, {allowMultiple: true});