import 'shared/reset.less';
import 'shared/layouts.less';
import React, {PureComponent} from 'react';
import Dashboard from 'components/dashboard/Dashboard';
import DashboardBlock from 'components/dashboardBlock/DashboardBlock';
import SamplerManager from 'containers/SamplerManager';
import Accompaniment from 'components/blocks/accompaniment/Accompaniment';
import SequencesDashboard from 'components/blocks/sequencesDashboard/SequencesDashboard';
import PanelControls from 'components/blocks/panelControls/PanelControls';
import KeyboardNavigation from 'containers/KeyboardNavigation';
import Master from 'containers/Master';
import Spinner from './Spinner';

class App extends PureComponent {
    render() {
        return (
            <div>
                <Dashboard>
                  <DashboardBlock>
                    <PanelControls/>
                  </DashboardBlock>
                  <DashboardBlock>
                    <SequencesDashboard/>
                  </DashboardBlock>
                  <DashboardBlock>
                    <Accompaniment/>
                  </DashboardBlock>
                </Dashboard>
                <Master/>
                <SamplerManager/>
                <KeyboardNavigation/>
                <Spinner/>
              </div>
        );
    }
}

export default App;
