import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

window.React = React

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch({type:"EDIT_LOCATION", newLocation:{"hello" : 123}})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);