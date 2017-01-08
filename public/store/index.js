import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './modules';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default preloadedState => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        preloadedState,
        compose(
            applyMiddleware(thunk, sagaMiddleware),
            (window.devToolsExtension && !IS_PRODUCTION) ? window.devToolsExtension() : f => f
        )
    );

    if (module.hot && !IS_PRODUCTION) {
        module.hot.accept('./modules/index', () => {
            const nextRootReducer = require('./modules/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return { ...store, runSaga: sagaMiddleware.run };
};
