/******************************************
 *  Author : Chris Cook   
 *  Created On : Sun Jul 28 2019
 *  File : invoice.js
 *******************************************/

const mongoose = require('mongoose');
const invoiceSchema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	},
	service: {
		type: String,
		required: true
	},
	price: {
		type: String,
		trim: true
	},
	due: {
		type: String,
		trim: true
	},
	status: {
		type: String,
		required: true,
		trim: true
	},
	created_on: {
		type: Date,
		default: Date.now
	}
});

const Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);

// Get invoices
module.exports.getInvoices = (callback, limit) => {
	Invoice.find(callback).limit(limit).sort([['created_on', 'ascending']]);
};

// Get invoice by id
module.exports.getInvoiceById = (id, callback) => {
	Invoice.findById(id, callback);
};

// Get customer invoices
module.exports.getCustomerInvoices = (customer_id, callback, limit) => {
	console.log('Finding invoices for customer_id: '+customer_id);
	let query = {customer: customer_id};
	Invoice.find(query, callback).limit(limit).sort([['created_on', 'ascending']]);
};

// Add invoice
module.exports.addInvoice = (invoice, callback) => {
	let add = {
		customer: invoice.customer,
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	};
	Invoice.create(add, callback);
};

// Update invoice
module.exports.updateInvoice = (id, invoice, options, callback) => {
	let update = { $set: {
		customer: invoice.customer,
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}};
	Invoice.findByIdAndUpdate(id, update, options, callback);
};

// Remove invoice by id
module.exports.removeInvoice = (id, callback) => {
	let query = {_id: id};
	Invoice.deleteOne(query, callback);
};
