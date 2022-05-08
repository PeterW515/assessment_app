import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ClientType from './components/main/ClientType';
import ExistingClientSearch from './components/main/ExistingClientSearch';

import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Client from './components/main/Client';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import PrivateRoute from './components/routing/PrivateRoute';


import './App.css';


const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clientType" element={<PrivateRoute component={ClientType} />} />
          <Route path="/client" element={<PrivateRoute component={Client} />} />
          <Route path="/existingClient" element={<PrivateRoute component={ExistingClientSearch} />} />

        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
