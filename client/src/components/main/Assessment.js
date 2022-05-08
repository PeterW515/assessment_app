import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Document } from 'react-pdf';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAssessment, generateReport } from '../../actions/data';


const Assessment = ({ login, isAuthenticated, clientTypeState, clientId, setClientTypeState }) => {
    const [assessmentFormState, setAssessmentFormState] = useState({ squat: '', deadlift: '', bench: '', pullUps: '', sitUps: '', cmj: '', notes: '' });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setAssessmentFormState({
            ...assessmentFormState,
            [name]: value,
        });
    };
    const onSubmit = async e => {
        e.preventDefault();
        const assessment = await addAssessment(assessmentFormState, clientId);
        const report = await generateReport(assessment.id, clientId);
    }

    return (
        <Fragment>
            <div className="row">
                <form onSubmit={e => onSubmit(e)} className="col s10 offset-s1">
                    <div className="input-field col s12">
                        <label htmlFor="squat" className="active">Squat (lbs)</label>
                        <input
                            className="validate text-input"
                            name="squat"
                            id="squat"
                            type="text"
                            value={assessmentFormState.squat}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="deadlift" className="active">Deadlift (lbs)</label>
                        <input
                            className="validate text-input"
                            name="deadlift"
                            id="deadlift"
                            type="text"
                            value={assessmentFormState.deadlift}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="bench" className="active">Bench Press (lbs)</label>
                        <input
                            className="validate text-input"
                            name="bench"
                            id="bench"
                            type="text"
                            value={assessmentFormState.bench}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="pullUps" className="active">Max Pull Ups</label>
                        <input
                            className="validate text-input"
                            name="pullUps"
                            id="pullUps"
                            type="text"
                            value={assessmentFormState.pullUps}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="sitUps" className="active">Max Sit Ups</label>
                        <input
                            className="validate text-input"
                            name="sitUps"
                            id="sitUps"
                            type="text"
                            value={assessmentFormState.sitUps}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="cmj" className="active">CMJ (Vertical)</label>
                        <input
                            className="validate text-input"
                            name="cmj"
                            id="cmj"
                            type="text"
                            value={assessmentFormState.cmj}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                className="validate materialize-textarea"
                                name="notes"
                                id="notes"
                                rows="10"
                                value={assessmentFormState.notes}
                                onChange={handleChange}
                            />
                            <label htmlFor="notes" className="active">Notes</label>

                        </div>
                    </div>

                    <button className="btn waves-effect waves-light col s12" type="submit" name="report">Generate Report
                    </button>
                </form>
            </div>
        </Fragment>
    );
}
Assessment.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Assessment);
