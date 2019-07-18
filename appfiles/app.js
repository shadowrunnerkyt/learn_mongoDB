const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Home
app.get('/', (req, res, next) => {
	res.send('Please use /api/products');
});

// Fetch all products
app.get('/api/products', (req, res, next) => {
	res.send('List products');
});

// Fetch single product
app.get('/api/products/:id', (req, res, next) => {
	res.send('Fetch product '+req.params.id);
});

// Add product
app.post('/api/products', (req, res, next) => {
	res.send('Add product');
});

// Update a product
app.put('/api/products/:id', (req, res, next) => {
	res.send('Update product '+req.params.id);
});

// Delete a product
app.delete('/api/products/:id', (req, res, next) => {
	res.send('Delete product '+req.params.id);
});

app.listen(port, () => {
	console.log('Server started on port: '+port);
});
