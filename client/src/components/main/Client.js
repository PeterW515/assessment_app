import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import NewClientInfo from './NewClientInfo';
import ExistingClientSearch from './NewClientInfo';


const Client = ({ login, isAuthenticated, clientTypeState, setClientTypeState }) => {


    if (clientTypeState === 'newClient') {
        return <NewClientInfo />
    }

    return <ExistingClientSearch />
};

Client.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Client);
