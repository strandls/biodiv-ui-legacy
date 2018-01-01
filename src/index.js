import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import { Login, Logout, AuthUtils} from './auth';

import reducers from './reducers';
import Footer from './app/footer/Footer';
import Header from './app/header/Header';
import HomePageContainer from './app/homePage/HomePageContainer';
import UserGroupHomePage from './userGroup/UserGroupHomePage';
import {AUTH_USER} from './auth/AuthConstants'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise)(createStore);

let store = createStoreWithMiddleware(reducers);
if (AuthUtils.isLoggedIn()) {
  store.dispatch({ type: AUTH_USER});
}

const newparams =  queryString.parse(document.location.search);
let search1=queryString.stringify(newparams);
let search2 = decodeURIComponent( search1 );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <div>
        <Header title={"IBP"}/>
        <div className="container-fluid">
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/observation/list" component={App} props={search2} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout} />
          <Route  path="/group/:groupName/observation" component={App} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
registerServiceWorker();
