import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
    const [formState, setFormState] = useState({ email: '', password: '' });


    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        login(formState.email, formState.password);
    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to='/clientType' />;
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col s10 offset-s1 center-align">
                    <h5 id="title"><b>THE ASSESSMENT AND PROGRESS TRACKING APP</b></h5>
                </div>
            </div>
            <div className="row">
                <div className="col s6 offset-s1">
                    <h4><b>Sign In</b></h4>
                </div>
            </div>
            <div className="row">
                <form onSubmit={e => onSubmit(e)} className="col s10 offset-s1">
                    <div className="input-field col s12">
                        <label htmlFor="email" className="active">Email</label>
                        <input
                            className="validate text-input"
                            placeholder="name@example.com"
                            name="email"
                            id="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="password" className="active">Password</label>
                        <input
                            className="validate"
                            placeholder="********"
                            name="password"
                            id="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn waves-effect waves-light col s12" type="submit" name="sign-in">Sign In
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
