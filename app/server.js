const express = require('express');
const morgan = require('morgan');
const server = express({});
const index = require('./routes/Index');
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');
const db = require('./db');
var port = process.env.PORT||3000;

require("./db");

server.use(logger)
	.use(express.urlencoded({
  	extended: true
	})).use(express.json()).use('/', index)
	.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
	});

server.listen(port, function(){
	console.log("server run on port "+port);
});
