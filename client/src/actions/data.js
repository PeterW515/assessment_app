import axios from 'axios';
import download from 'downloadjs';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';


//add client
export const addClient = async ({ firstName, lastName, age, gender, height, weight, standingReach }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }

    const body = JSON.stringify({ firstName, lastName, age, gender, height, weight, standingReach });

    try {
        const res = await axios.post('/api/clients', body, config);
        return res.data.payload.client;
    } catch (err) {
        console.log(err);
    }

}

export const addUser = async ({ firstName, lastName, email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
        const res = await axios.post('/api/users', body, config);
        return res.data.payload.client;
    } catch (err) {
        console.log(err);
    }
}

//add assessment
export const addAssessment = async ({ squat, deadlift, bench, pullUps, sitUps, cmj, notes }, clientId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }

    const assessmentDate = new Date();


    const body = JSON.stringify({ squat, deadlift, bench, pullUps, sitUps, cmj, notes, clientId, assessmentDate });

    try {
        const res = await axios.post('/api/assessments', body, config);
        return res.data.payload.assessment;
    } catch (err) {
        console.log(err);
    }

}

//generate report
export const generateReport = async (assessmentId, clientId) => {
    const config = {
        headers: {
            'Content-Type': 'application/pdf',
            'x-auth-token': localStorage.getItem('token')
        },
        responseType: 'blob'
    }
    try {
        const res = await axios.get('/api/generateReports/clientId/' + clientId + '/assessmentId/' + assessmentId, config);
        const content = res.headers['content-type'];
        download(res.data, 'report', content);
        return res.status;
    } catch (err) {
        console.log(err);
    }

}