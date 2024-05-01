const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const policyRoutes = require('./policyRoutes');


const app = express();

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(bodyParser.json());


app.use('/api', policyRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
