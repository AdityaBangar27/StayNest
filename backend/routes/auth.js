const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, bookProperty, unbookProperty } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);
router.post('/book/:id', auth, bookProperty);
router.post('/unbook/:id', auth, unbookProperty);

module.exports = router;
