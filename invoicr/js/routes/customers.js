const express = require('express');
const router = express.Router();

// Get all customers
router.get('/', (req, res) => {
	res.send('Customers');
});

module.exports = router;