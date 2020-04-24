const mongoose = require('./connection')

var lockerSchema = mongoose.Schema({
	lockerNo: {type: String, required: true},
	lockCode: {type: String, min: 3, max: 4, required: true},
	location: {type: mongoose.Schema.Types.ObjectId, ref: 'locations', required: true},
	status: {type: String, enum: ['available', 'reserved', 'owned', 'abandoned'] , required: true}
})

var Locker = mongoose.model("lockers", lockerSchema);

exports.findCurrentLocker = function(query, next){
	Locker.findOne(query, function(err, locker){
		next(err, locker);
	})
}

exports.statusChange = function(lockers, query, next){
	Locker.updateMany(lockers, query, function(err, lockers){
		next(err, lockers);
	})
}

exports.findResults = function(query, next){
	Locker.find(query, function(err, lockers){
		next(err, lockers)
	})
}

exports.loadLockers = function(next){
	Locker.find({ }, function(err, lockers){
		next(err, lockers)
	})
}

/*locker modify*/
exports.addLocker = function(obj, next){
	const locker = new Locker(obj);
	
	locker.save(function(err, locker){
		next(err, locker)
	})
}

exports.countLockers = function(query, next){
	Locker.count(query, function(err, count){
		next(err, count)
	})
}

exports.editLocker = function(locker, query, next){
	Locker.updateOne(locker, query, function(err, locker){
		next(err, locker)
	})
}

exports.deleteLocker = function(query, next){
	Locker.deleteOne(query, function(err, locker){
		next(err, locker)
	})
}
