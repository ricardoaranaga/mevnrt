// Load .env config
require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const app = express()

require("./helpers/db/mongodb.js")()

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

app.use(bodyParser.json())
app.use(cors())

app.use(morgan("dev")); // configure morgan

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/customer.routes')(app);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))

module.exports = app;
