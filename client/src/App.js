import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ClientType from './components/main/ClientType';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Client from './components/main/Client';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  const [clientTypeState, setClientTypeState] = useState('');


  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Login />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/clientType" element={<ClientType clientTypeState={clientTypeState} setClientTypeState={setClientTypeState} />} />
              <Route exact path="/client" element={<Client clientTypeState={clientTypeState} setClientTypeState={setClientTypeState} />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
