const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Content = require('../models/Content');

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

// Get Content
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Content (Admin only)
router.put('/', auth, async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content();
    }
    
    // Merge updates
    Object.keys(req.body).forEach(key => {
      content[key] = req.body[key];
    });

    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
