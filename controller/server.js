// Import Express and other required modules
const express = require('express');
const bodyParser = require('body-parser');
const policyRoutes = require('./policyRoutes');

// Create an Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Use the imported routes for the /api/policies path
app.use('/api', policyRoutes);

// Set the port for the application
const PORT = process.env.PORT || 3000;

// Make the application listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
