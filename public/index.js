import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import App from 'containers/App';


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
