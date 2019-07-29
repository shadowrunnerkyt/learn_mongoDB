const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice')

// error handling
function errHand(err) {
	console.error(err.stack);
	res.status(500).send('Something broke!\n'+err.stack);
}

// Get all invoices
router.get('/', (req, res) => {
	Invoice.getInvoices( (err, invoices) => {
		if(err){errHand(err);}
		res.json(invoices);
	});
});

// Get single invoice
router.get('/:id', (req, res) => {
	Invoice.getInvoiceById( req.body.id, (err, invoices) => {
		if(err){errHand(err);}
		res.json(invoices);
	});
});

// Get all customer invoices
router.get('/customer/:customer_id', (req, res) => {
	Invoice.getCustomerInvoices( req.body.customer_id, (err, invoices) => {
		if(err){errHand(err);}
		res.json(invoices);
	});
});

// Add single invoice
router.post('/', (req, res) => {
	let invoice = req.body;
	Invoice.addInvoice( req.body, (err, invoice) => {
		if(err){errHand(err);}
		res.json(invoice);
	});
});

// Update single invoice
router.put('/:id', (req, res) => {
	let id = req.params.id;
	let invoice = req.body;
	Invoice.updateInvoice( id, invoice, {}, (err, invoice) => {
		if(err){errHand(err);}
		res.json(invoice);
	});
});

// Delete single invoice
router.delete('/:id', (req, res) => {
	Invoice.removeInvoice( req.params.id, (err, invoice) => {
		if(err){errHand(err);}
		res.json(invoice);
	});
});

module.exports = router;