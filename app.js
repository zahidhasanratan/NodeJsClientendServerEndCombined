const express = require('express');
const router = require('./src/route/api');
const app = new express();
const bodyPerser = require('body-parser');

//Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database Middleware
const mongoose = require('mongoose');

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Body perser Impletent
app.use(bodyPerser.json());

//Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 300 // 
  });