const mysql = require('mysql2/promise');
require('dotenv').config();
  
// Destructuring environment variables for use in connection options
const { DB_USER, DB_PASS, DB_NAME } = process.env;

const createDatabase = async () => {
  // Creating a mysql connection to the database provided in the .env file
  const connection = await mysql.createConnection({
    user: DB_USER, 
    password: DB_PASS 
  });
  // Runs query to create database if it does not exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
  console.log("Database create or successfully checked");
  process.exit(0);
};

createDatabase();