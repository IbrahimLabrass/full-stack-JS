const db = require('../config/database');

// Controller functions for CRUD operations on courses

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const query = 'INSERT INTO courses (title, description, instructor, price) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, instructor, price], (err, result) => {
      if (err) {
        console.error('Error creating course:', err);
        return res.status(500).send('Error creating course');
      }
      res.status(201).send('Course created successfully');
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send('Error creating course');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const query = 'SELECT * FROM courses';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error retrieving courses:', err);
        return res.status(500).send('Error retrieving courses');
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).send('Error retrieving courses');
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM courses WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error retrieving course by ID:', err);
        return res.status(500).send('Error retrieving course by ID');
      }
      if (result.length === 0) {
        return res.status(404).send('Course not found');
      }
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error('Error retrieving course by ID:', error);
    res.status(500).send('Error retrieving course by ID');
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, instructor, price } = req.body;
    const query = 'UPDATE courses SET title = ?, description = ?, instructor = ?, price = ? WHERE id = ?';
    db.query(query, [title, description, instructor, price, id], (err, result) => {
      if (err) {
        console.error('Error updating course:', err);
        return res.status(500).send('Error updating course');
      }
      res.status(200).send('Course updated successfully');
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send('Error updating course');
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM courses WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting course:', err);
        return res.status(500).send('Error deleting course');
      }
      res.status(200).send('Course deleted successfully');
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send('Error deleting course');
  }
};
