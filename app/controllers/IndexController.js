
var Person = new require('../models/Person');

module.exports.get = function(req, res){
	const projection = {
		"_id":0,
		"name":1,
		"age":1
	};
	if(req.query.name){
		Person.find({name:req.query.name}, projection, function(err, persons){
			if(err){
				res.status(418).send();
				console.log(err);
			}
			res.send(JSON.stringify(persons));
		});
	}else{
		Person.find({}, projection, function(err, persons){
			if(err){
				res.status(418).send();
				console.log(err);
			}
			res.send(JSON.stringify(persons));
		});
	}
};

module.exports.post = function(req, res){
	var person = new Person(req.body);
	console.log(JSON.stringify(person));
	person.save(function (err, fluffy) {
			if (err){
					res.status(418).send();
				 	console.log(err);
		  } else {
		  	res.status(200).send();
		  }
		}
  );
};
