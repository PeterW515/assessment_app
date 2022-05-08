import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const ClientType = ({ auth: { user } }) => {

    const [clientType, setClientType] = useState('');

    const clientButtonHandler = async e => {
        e.preventDefault();
        await setClientType(e.target.name);
    };

    if (clientType === 'newClient') {
        return <Navigate to="/client" />
    } else if (clientType === 'existingClient') {
        return <Navigate to="/existingClient" />
    }

    return (
        <div>
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
        </div>
    );
};

ClientType.propTypes = {
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(ClientType);
