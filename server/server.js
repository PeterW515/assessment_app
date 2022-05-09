const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const db = require('./config/connection');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/clients', require('./routes/api/clients'));
app.use('/api/assessments', require('./routes/api/assessments'));
app.use('/api/generateReports', require('./routes/api/generateReports'));



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;



db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});