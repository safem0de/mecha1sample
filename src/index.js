import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Calendar from './components/Calendar';
import All from './components/All';
import Loading from './components/Loading';
import Login from './components/Login';
import {Example} from './components/Example';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Loading>
        <Header/>
        <Switch>
          <Route path='/Login' component={Login} exact={true}/>
          <Route path='/' component={App} exact={true}/>
          <Route path='/Calendar' component={Calendar} exact={true}/>
          <Route path='/All' component={All} exact={true}/>
          <Route path='/Print' component={Example} exact={true}/>
        </Switch>
        </Loading>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
