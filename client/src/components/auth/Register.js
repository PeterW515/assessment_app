import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/data';
//import Client from './Client';


const NewUserInfo = ({ login, isAuthenticated }) => {
    const [userFormState, setUserFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserFormState({
            ...userFormState,
            [name]: value,
        });
    };
    const onSubmit = async e => {
        e.preventDefault();
        const user = await addUser(userFormState);
        console.log(user);
    }


    return (
        <Fragment>
            <div className="row">
                <form onSubmit={e => onSubmit(e)} className="col s10 offset-s1">
                    <div className="input-field col s12">
                        <label htmlFor="firstName" className="active">First Name</label>
                        <input
                            className="validate text-input"
                            name="firstName"
                            id="firstName"
                            type="text"
                            value={userFormState.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="lastName" className="active">Last Name</label>
                        <input
                            className="validate text-input"
                            name="lastName"
                            id="lastName"
                            type="text"
                            value={userFormState.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="email" className="active">Email</label>
                        <input
                            className="validate email-input"
                            name="email"
                            id="email"
                            type="email"
                            value={userFormState.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="password" className="active">Password</label>
                        <input
                            className="validate password-input"
                            name="password"
                            id="password"
                            type="password"
                            value={userFormState.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="btn waves-effect waves-light col s12" type="submit" name="register-user">Register User
                    </button>
                </form>
            </div>
        </Fragment>
    );
}

NewUserInfo.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(NewUserInfo);