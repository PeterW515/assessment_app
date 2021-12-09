import axios from 'axios';
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
        return res.data.payload.client;
    } catch (err) {
        console.log(err);
    }

}