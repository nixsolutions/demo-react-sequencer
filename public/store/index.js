import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';

let store = createStore(combineReducers(reducers),
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (module.hot) {
    module.hot.accept('./modules/index', () => {
        const nextRootReducer = combineReducers(require('./modules/index').default);
        store.replaceReducer(nextRootReducer);
    });
}

export default store;