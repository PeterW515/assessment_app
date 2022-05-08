import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ firstName, lastName, email, password });
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/clientType" />;
    }


    return (
        <div className="row">
            <form onSubmit={e => onSubmit(e)} className="col s10 offset-s1">
                <div className="input-field col s12">
                    <label htmlFor="firstName" className="active">First Name</label>
                    <input
                        className="validate text-input"
                        name="firstName"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={onChange}
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="lastName" className="active">Last Name</label>
                    <input
                        className="validate text-input"
                        name="lastName"
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={onChange}
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="email" className="active">Email</label>
                    <input
                        className="validate email-input"
                        name="email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password" className="active">Password</label>
                    <input
                        className="validate password-input"
                        name="password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password2" className="active">Confirm password</label>
                    <input
                        className="validate password-input"
                        name="password2"
                        id="password2"
                        type="password"
                        value={password2}
                        onChange={onChange}
                    />
                </div>

                <button className="btn waves-effect waves-light col s12" type="submit" name="register-user">Register User
                </button>
            </form>
        </div>
    );
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);