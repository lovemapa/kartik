import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import reducer  from "./reducer/index.js"
import thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createMemoizeMiddleware from 'redux-memoize';
import {saveState,persistedState} from './savestate/index'



let store = createStore(reducer,
    persistedState,
    applyMiddleware(createMemoizeMiddleware({ ttl: 200 }),thunk)
    )
store.subscribe(() => {
    saveState(store.getState());
});


ReactDOM.render(

	<Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
