const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');
const config = require('config');
const auth = require('../../utils/auth');


const Client = require('../../models/Assessment');
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

module.exports = router;
