import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { grupoReducer } from '../reducers/grupoReducer';
import { ramaReducer } from '../reducers/ramaReducer';
import { seccionReducer } from '../reducers/seccionReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    grupoReducer: grupoReducer,
    ramaReducer: ramaReducer,
    seccionReducer: seccionReducer,
});


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);