import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addClient } from '../../actions/data';


const NewClientInfo = ({ login, isAuthenticated, clientTypeState, setClientTypeState }) => {
    const [clientFormState, setClientFormState] = useState({ firstName: '', lastName: '', Age: '', Gender: '', Height: '', Weight: '', StandingReach: '' });
    const [clientState, setClientState] = useState('');

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setClientFormState({
            ...clientFormState,
            [name]: value,
        });
    };
    const onSubmit = async e => {
        e.preventDefault();
        const client = await addClient(clientFormState);
        setClientState(client.id);
    }

    if (clientState) {
        return <Assessment />
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
                            value={clientFormState.firstName}
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
                            value={clientFormState.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="age" className="active">Age</label>
                        <input
                            className="validate text-input"
                            name="age"
                            id="age"
                            type="text"
                            value={clientFormState.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="gender" className="active">Gender</label>
                        <input
                            className="validate text-input"
                            name="gender"
                            id="gender"
                            type="text"
                            value={clientFormState.gender}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="height" className="active">Height (inches)</label>
                        <input
                            className="validate text-input"
                            name="height"
                            id="height"
                            type="text"
                            value={clientFormState.height}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="weight" className="active">Weight (lbs)</label>
                        <input
                            className="validate text-input"
                            name="weight"
                            id="weight"
                            type="text"
                            value={clientFormState.weight}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="standingReach" className="active">Standing Reach (inches)</label>
                        <input
                            className="validate text-input"
                            name="standingReach"
                            id="standingReach"
                            type="text"
                            value={clientFormState.standingReach}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn waves-effect waves-light col s12" type="submit" name="sign-in">Next
                    </button>
                </form>
            </div>
        </Fragment>
    );
}
NewClientInfo.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(NewClientInfo);
