const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// error handling
function errHand(err) {
	console.error(err.stack);
	res.status(500).send('Something broke!\n'+err.stack);
}

// Get all customers
router.get('/', (req, res) => {
	Customer.getCustomers( (err, customers) => {
		console.log('Getting customer list['+customers.length+']');
		if(err){errHand(err);}
		res.json(customers);
	});
});

// Get single customer
router.get('/:id', (req, res) => {
	console.log('Getting id: '+req.params.id);
	Customer.getCustomerById( req.params.id, (err, customer) => {
		if(err){errHand(err);}
		res.json(customer);
	});
});

// Add single customer
router.post('/', (req, res) => {
	Customer.addCustomer( req.body, (err, customer) => {
		console.log('Adding customer: '+req.body.first_name+' '+req.body.last_name+' ['+req.body.company+']');
		if(err){errHand(err);}
		res.json(customer);
	});
});

// Update single customer
router.put('/:id', (req, res) => {
	let id = req.params.id;
	let customerData = req.body;
	console.log('Updating customer: '+id);
	Customer.updateCustomer ( id ,customerData, {new: true, upsert: true}, (err, customer) => {
		if(err){errHand(err);}
		res.json(customer);
	});
});

// Delete single customer
router.delete('/:id', (req, res) => {
	let id = req.params.id;
	console.log('Removing customer: '+id);
	Customer.removeCustomer( id, (err, customer) => {
		if(err){errHand(err);}
		res.json(customer);
	});
});

module.exports = router;