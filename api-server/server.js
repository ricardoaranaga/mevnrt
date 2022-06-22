// Load .env config
require('dotenv').config();


const Nexmo = require('nexmo');
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


const userAcl = {
    "paths": {
        "/*/users/**": {},
        "/*/conversations/**": {},
        "/*/sessions/**": {},
        "/*/devices/**": {},
        "/*/image/**": {},
        "/*/media/**": {},
        "/*lications/**": {},
        "/*/push/**": {},
        "/*/knocking/**": {},
        "/*/legs/**": {}
    }
}

// endpoint that doesn't authenticate the user
// it will simply return a JWT with every request
app.get('/no-auth', (req, res) => {
    const jwt = Nexmo.generateJwt(process.env.VONAGE_PRIVATE_KEY_PATH, {
        application_id: process.env.VONAGE_APPLICATION_ID,
        sub: process.env.VONAGE_USER,
        exp: new Date().getTime() + 86400,
        acl: userAcl,
    })
    
    res.json({userJwt: jwt})
})

app.get('/answer', (req, res) => {
	console.log("Connecting the call")
    res.json([ 
        { 
            "action": "talk", 
            "text": "Please wait while we connect you."
        },
        {
            "action": "connect",
            "from": process.env.VONAGE_NUMBER,
            "endpoint": [
                {
                "type": "phone",
                "number": req.query.to
                }
            ]
        }
    ]);
})

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))

module.exports = app;