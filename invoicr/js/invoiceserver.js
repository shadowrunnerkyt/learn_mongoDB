/******************************************
 *  Author : Chris Cook   
 *  Created On : Mon Jul 22 2019
 *  File : invoiceserver.js
 *******************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const db = mongojs('mongodb://192.168.33.10/taskmanager', ['categories','tasks']);
const app = express();
const port = 3002;

// Client folder
app.use(express.static(__dirname+'/client'));
// Use body-parser
app.use(bodyParser.json());
// define cors options
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

app.listen(port, () => {
	console.log('Server started on port: '+port);
});

// Empty root
app.get('/', (req, res, next) => {
	res.send('Please use /api/customers or /api/invoices');
});

// route files
const customers = require('./routes/customers');
const invoices = require('./routes/invoices');

// paths
app.use('/api/customers', customers);
app.use('/api/invoices', invoices);
