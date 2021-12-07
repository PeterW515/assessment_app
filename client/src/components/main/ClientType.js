import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const ClientType = ({ login, isAuthenticated, clientTypeState, setClientTypeState }) => {



    const clientButtonHandler = async e => {
        e.preventDefault();
        await setClientTypeState(e.target.name);
    };

    if (clientTypeState) {
        return <Navigate to="/client" />
    }


    return (
        <Fragment>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row">
                <button className="btn waves-effect waves-light col s12" type="button" onClick={clientButtonHandler} name="newClient">New Client
                </button>
                <div className="row"></div>
                <div className="row"></div>
                <button className="btn waves-effect waves-light col s12" type="button" onClick={clientButtonHandler} name="existingClient">Existing Client
                </button>
            </div>
        </Fragment>
    );
};

ClientType.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(ClientType);
