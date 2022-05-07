const db = require('../config/connection');

const { User } = require('../models');
const userSeeds = require('./userSeeds.json');

const { Client } = require('../models');
const { clientSeeds } = require('./clientSeeds.json');

const { Assessment } = require('../models');
const { assessmentSeeds } = require('./assessmentSeeds.json');

db.sync({ force: true }).then(async () => {
  try {

    await User.bulkCreate(userSeeds, {
      individualHooks: true,
      returning: true,
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});

