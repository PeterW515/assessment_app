const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');
const config = require('config');
const auth = require('../../utils/auth');
const pdfGeneration = require('../../utils/pdfGeneration');


const Client = require('../../models/Client');
const Assessment = require('../../models/Assessment');



// @route    GET api/generateReports/clientId/:clientId/assessmentId/:assessmentId
// @desc     Generate report data
// @access   Private
router.get('/clientId/:clientId/assessmentId/:assessmentId', auth, async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.clientId);
        if (!client) {
            return res
                .status(404)
                .json({ errors: [{ msg: "Client not found" }] });
        }
        const assessment = await Assessment.findByPk(req.params.assessmentId);
        if (!assessment) {
            return res
                .status(404)
                .json({ errors: [{ msg: "Assessment not found" }] });
        }
        if (!assessment.clientId == client.id) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Bad request: assessment does not belong to client" }] });
        }


        let responsePayload = {
            clientHeader: client,
            assessmentSummary: assessment
        }

        pdfGeneration(responsePayload);
        res.json(responsePayload);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;
