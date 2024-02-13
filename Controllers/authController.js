const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../config/database');

// Controller functions for user authentication

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from database
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, result) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).send('Error logging in');
      }
      if (result.length === 0) {
        return res.status(401).send('Invalid username or password');
      }
      const match = await bcrypt.compare(password, result[0].password);
      if (match) {
        const token = jwt.sign({ username: result[0].username }, 'your_secret_key');
        return res.status(200).send({ token });
      }
      res.status(401).send('Invalid username or password');
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
};
