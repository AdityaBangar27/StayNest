const express = require('express');
const router = express.Router();
const { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', auth, createProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;
