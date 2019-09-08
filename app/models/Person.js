var mongoose = require('mongoose');
var PersonSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true,
  	maxlength: 25,
  },
  age: {
  	type: Number,
  	required: true
  },
});

module.exports = mongoose.model('person', PersonSchema);