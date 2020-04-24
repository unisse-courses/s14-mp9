const mongoose = require('./connection')

var locationSchema = new mongoose.Schema({
	locationName: {type: String, required: true}
})

var Location = mongoose.model("locations", locationSchema);


exports.addLocation = function(obj, next){
	const location = new Location(obj);
	
	location.save(function(err, location){
		next(err, location)
	})
}

exports.loadLocations = function(next){
	Location.find({ }, function(err, locations){
		next(err, locations)
	})
}

exports.deleteLocation = function(query, next){
	Location.deleteOne(query, function(err, location){
		next(err, location)
	})
}

exports.getOne = function(query, next){
	Location.findOne(query, function(err, location){
		next(err, location)
	})
}