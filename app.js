const express = require('express');
const router = require('./src/route/api');
const app = express(); // No need to use 'new'
const bodyParser = require('body-parser'); // Fixed typo

// Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const { path } = require('express/lib/application');

// Apply Security Middleware
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implementation
app.use(bodyParser.json());

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300 // Limit each IP to 300 requests per windowMs
});
app.use(limiter); // Attach rate limiter to the app


//Managin Frontend Routing
app.use(express.static('client/build'))

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


// Managing Backend API Routing
app.use("/api/v1", router);

// Export the app instance
module.exports = app;
