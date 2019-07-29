/******************************************
 *  Author : Chris Cook   
 *  Created On : Sun Jul 28 2019
 *  File : customer.js
 *******************************************/

const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true,
		trim: true
	},
	last_name: {
		type: String,
		required: true,
		trim: true
	},
	company: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		trim: true
	},
	address: {
		street: String,
		city: String,
		state: {
			type: String,
			uppercase: true,
			minlength: 2,
			maxlength: 2
		},
		zip: {
			type: String,
			minlength: 5
		}
	},
	created_on: {
		type: Date,
		default: Date.now
	}
});

const Customer = module.exports = mongoose.model('Customer', customerSchema, 'customers');

// Get customers
module.exports.getCustomers = (callback, limit) => {
	Customer.find(callback).limit(limit).sort([['first_name', 'ascending']]);
	// Customer.find().exec(callback);
};

// Get customer by id
module.exports.getCustomerById = (id, callback) => {
	Customer.find({_id: id}, callback);
};

// Add customer
module.exports.addCustomer = (customer, callback) => {
	let add = {
		first_name: customer.first_name,
		last_name: customer.last_name,
		company: customer.company,
		email: customer.email,
		phone: customer.phone,
		address: {
			street: customer.address.street,
			city: customer.address.city,
			state: customer.address.state,
			zip: customer.address.zip
		}
	};
	Customer.create(add, callback);
};

// Update customer
module.exports.updateCustomer = (id, customer, options, callback) => {
	let query = {_id: id};
	let update = {
		first_name: customer.first_name,
		last_name: customer.last_name,
		company: customer.company,
		email: customer.email,
		phone: customer.phone,
		address: {
			street: customer.address.street,
			city: customer.address.city,
			state: customer.address.state,
			zip: customer.address.zip
		}
	};
	Customer.findOneAndUpdate(query, update, options, callback);
};

// Remove customer by id
module.exports.removeCustomer = (id, callback) => {
	let query = {_id: id};
	Customer.remove(query, callback);
};
