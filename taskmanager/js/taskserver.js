/******************************************
 *  Author : Author   
 *  Created On : Mon Jul 22 2019
 *  File : taskserver.js
 *******************************************/

const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('mongodb://192.168.33.10/taskmanager', ['categories','tasks']);
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Home
app.get('/', (req, res, next) => {
	res.send('Please use /taskmanager/categories');
});

// Fetch all categories
app.get('/taskmanager/categories', (req, res, next) => {
	db.categories.find((err, docs) => {
		if(err) {
			res.send(err);
		}
		console.log('Categories Found...');
		res.json(docs);
	});
});

// Fetch all tasks
app.get('/taskmanager/tasks', (req, res, next) => {
	db.tasks.find((err, docs) => {
		if(err) {
			res.send(err);
		}
		console.log('Tasks Found...');
		res.json(docs);
	});
});

// Fetch single product
app.get('/api/products/:id', (req, res, next) => {
	db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
		if(err) {
			res.send(err);
		}
		console.log('Product Found...');
		res.json(doc);
	});
});

// Add product
app.post('/api/products', (req, res, next) => {
	db.products.insert(req.body), (err, doc) =>{
		if(err){
			res.send(err);
		}
		console.log('Adding product...');
		res.json(doc);
	}
});

// Update a product
app.put('/api/products/:id', (req, res, next) => {
	db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)}, 
		update:{
			$set:{
				name: req.body.name,
				category: req.body.category,
				details: req.body.details
			}},
		new: true}, (err, doc) => {
			if(err){
				res.send(err);
			}
		console.log('Updating product...');
		res.json(doc);
	});
});

// Delete a product
app.delete('/api/products/:id', (req, res, next) => {
	db.products.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
		if(err){
			res.send(err);
		}
		console.log('Removing product...');
		res.json(doc);
	});
});

app.listen(port, () => {
	console.log('Server started on port: '+port);
});
