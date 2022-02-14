const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');



const swaggerDocument = require('./swagger.json');
const router = require('./routes')

const app = express();

const corsOption = {
    credentials: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
    origin: true
};

app.use(cors(corsOption))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// health check
app.get('/api/health', (req, res) => {
    res.status(200).send('Ok');
});

// swagger api docs
app.use('/api/api-docs', function (req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());

app.use('/api', router)




const PORT = process.env.NODE_LOCAL_PORT || 8080;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});