import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

// For Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers'

const store = createStore(reducers, compose(composeWithDevTools(applyMiddleware(thunk))))


ReactDOM.render(
  <Provider store = {store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
 
  ,
  document.getElementById('root')
);
