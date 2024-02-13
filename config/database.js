const mysql = require('mysql');

// Configure MySQL crudcourses connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysql',
});

// Connect to MySQL crudcourses
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL crudcourses');

  // Create database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS crudcourses', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      throw err;
    }
    console.log('Database created or already exists');

    // Switch to crudcourses database
    db.query('USE crudcourses', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        throw err;
      }
      console.log('Using crudcourses');

      // Create users table if it doesn't exist
      db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          throw err;
        }
        console.log('Users table created or already exists');
      });

      // Create courses table if it doesn't exist
      db.query(`CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        instructor VARCHAR(255),
        price DECIMAL(10, 2)
      )`, (err) => {
        if (err) {
          console.error('Error creating courses table:', err);
          throw err;
        }
        console.log('Courses table created or already exists');
      });
    });
  });
});

module.exports = db;
