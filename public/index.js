import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store';
import rootSaga from 'sagas';
import App from 'containers/App';

const store = configureStore();

store.runSaga(rootSaga);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
