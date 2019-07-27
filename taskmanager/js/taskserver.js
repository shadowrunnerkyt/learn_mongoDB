/******************************************
 *  Author : Author   
 *  Created On : Mon Jul 22 2019
 *  File : taskserver.js
 *******************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('mongodb://192.168.33.10/taskmanager', ['categories','tasks']);
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.options('*', cors({
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 204
  })); 

// To allow cross origin connections from actual local host to Express over HTTP
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Home
app.get('/', (req, res, next) => {
	res.send('Please use /taskmanager/tasks');
});

// Fetch all categories
app.get('/taskmanager/categories', (req, res, next) => {
	db.categories.find((err, docs) => {
		if(err) {res.send(err);}
		console.log('Categories Found...');
		res.json(docs);
	});
});

// Fetch all tasks
app.get('/taskmanager/tasks', (req, res, next) => {
	db.tasks.find((err, docs) => {
		if(err) {res.send(err);}
		console.log('Tasks Found...');
		res.json(docs);
	});
});

// Fetch single task
app.get('/taskmanager/tasks/:id', (req, res, next) => {
	console.log('Retrieving task: '+req.params.id);
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
		if(err) {res.send(err);}
		res.json(doc);
	});
});

// Add task
app.post('/taskmanager/tasks', (req, res, next) => {
	console.log('Adding task... '+req.body.task_name);
	db.tasks.insert(req.body), (err, doc) =>{
		if(err){res.send(err);}
		res.json(doc);
	}
});

// Update a task
app.put('/taskmanager/tasks/:id', cors(), (req, res, next) => {
	let task_id = mongojs.ObjectId(req.params.id);
	console.log('Updating task: '+task_id);
	db.tasks.update(
		{_id : task_id},
		{$set: {
			task_name: req.body.task_name,
			category: req.body.category,
			due_date: req.body.due_date,
			is_urgent: req.body.is_urgent
		}}, 
		(err, doc) => {
			if(err){res.send(err);}
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
