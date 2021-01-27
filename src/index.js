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
// import Loading from './components/Loading';
import Loadingz from './components/Loadingz';
import Login from './components/Login';
import Authenticate from './components/Authenticate';
import SampleLotDetail from './components/SampleLotDetail';
import Example from './components/Example';
import ProcessInput from './components/ProcessInput';
import SampleChart from './components/SampleChart';
import Table from './components/Table';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Loadingz>
        <Switch>
          <Route path='/login' component={Login} exact={true}/>
          <Route path='/process/:id/:sap' component={ProcessInput} exact={true}/>
          <Route path='/chart' component={SampleChart} exact={true}/>
          <Route path='/table' component={Table} exact={true}/>
          <Route path='/calendar' component={Calendar} exact={true}/>
          <Authenticate>
          <Header/>
            <Route path='/' component={App} exact={true}/>
            <Route path='/all' component={All} exact={true}/>
            <Route path='/all/:id' component={SampleLotDetail} exact={true}/>
            <Route path='/print/:id' component={Example} exact={true}/>
          </Authenticate>
        </Switch>
        </Loadingz>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
