const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');
const config = require('config');
const auth = require('../../utils/auth');


const Client = require('../../models/Client');


// @route    POST api/clients
// @desc     Register client
// @access   Private
router.post('/', auth, async (req, res) => {

    const {
        firstName,
        lastName,
        age,
        gender,
        height,
        weight,
        standingReach
    } = req.body;

    try {
        let client = await Client.findOne({ where: { firstName, lastName } });

        if (client) {
            return res.status(400).json({ errors: [{ msg: 'Client already exists' }] });
        };


        const newClient = await Client.create(
            {
                firstName,
                lastName,
                age,
                gender,
                height,
                weight,
                standingReach,
                recordedBy: (req.user.id)
            }
        );


        const payload = {
            client: {
                id: newClient.id,
                firstName: newClient.firstName,
                lastName: newClient.lastName
            }
        };

        res.json({ payload });

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/clients
// @desc     Get all clients
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const clients = await Client.findAll()
        res.json(clients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/clients/:id
// @desc     Get one client
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
