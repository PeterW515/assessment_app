const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');
const config = require('config');
const auth = require('../../utils/auth');


const Client = require('../../models/Client');
const Assessment = require('../../models/Assessment');


// @route    POST api/assessments
// @desc     Create assessment
// @access   Private
router.post('/', auth, async (req, res) => {

    const {
        clientId,
        assessmentDate,
        squat,
        deadlift,
        bench,
        pullUps,
        sitUps,
        cmj,
        notes
    } = req.body;

    try {

        const newAssessment = await Assessment.create(
            {
                clientId,
                assessmentDate,
                squat,
                deadlift,
                bench,
                pullUps,
                sitUps,
                cmj,
                notes,
                recordedBy: (req.user.id)
            }
        );


        const payload = {
            assessment: {
                id: newAssessment.id,
                assessmentDate: newAssessment.assessmentDate,
                clientId: newAssessment.clientId,
                squat: newAssessment.squat,
                deadlift: newAssessment.deadlift,
                bench: newAssessment.bench,
                pullUps: newAssessment.pullUps,
                sitUps: newAssessment.sitUps,
                cmj: newAssessment.cmj,
                notes: newAssessment.notes,
                recordedBy: newAssessment.recordedBy,
            }
        };

        res.json({ payload });

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/assessments/bulkImport
// @desc     Create multiple assessment
// @access   Private
router.post('/bulkImport', auth, async (req, res) => {
    try {
        const assessments = req.body;
        const payload = [];
        for (let i = 0; i < assessments.length; i++) {
            let {
                clientId,
                assessmentDate,
                squat,
                deadlift,
                bench,
                pullUps,
                sitUps,
                cmj,
                notes
            } = assessments[i];

            let newAssessment = await Assessment.create(
                {
                    clientId,
                    assessmentDate,
                    squat,
                    deadlift,
                    bench,
                    pullUps,
                    sitUps,
                    cmj,
                    notes,
                    recordedBy: (req.user.id)
                }
            );

            const returnAssessmentData = {
                assessment: {
                    id: newAssessment.id,
                    clientId: newAssessment.clientId,
                    recordedBy: newAssessment.recordedBy
                }
            };
            payload.push(returnAssessmentData);
        }
        res.json({ payload });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error')
    }

});

// @route    GET api/assessments
// @desc     Get all assessments
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const assessments = await Assessment.findAll()
        res.json(assessments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/assessments/:id
// @desc     Get one assessment
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const assessment = await Assessment.findByPk(req.params.id);
        res.json(assessment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/assessments/clientId/:id
// @desc     Get assessments by client
// @access   Private
router.get('/clientId/:clientId', auth, async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.clientId);

        if (!client) {
            return res
                .status(404)
                .json({ errors: [{ msg: "Client not found" }] });
        }
        const assessments = await Assessment.findAll({ where: { clientId: (client.id) } });
        let responsePayload = {
            clientHeader: client,
            assessmentSummary: assessments
        }
        res.json(responsePayload);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/assessments/clientId/:id
// @desc     Get assessments by client
// @access   Private
router.get('/clientId/:clientId', auth, async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.clientId);

        if (!client) {
            return res
                .status(404)
                .json({ errors: [{ msg: "Client not found" }] });
        }
        const assessments = await Assessment.findAll({ where: { clientId: (client.id) } });
        let responsePayload = {
            clientHeader: client,
            assessmentSummary: assessments
        }
        res.json(responsePayload);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
