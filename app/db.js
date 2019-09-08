const mongoose = require('mongoose');
const config = require("config");
mongoose.connect(config.db.url, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
