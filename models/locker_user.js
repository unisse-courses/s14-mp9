const mongoose = require('./connection')

var userSchema = new mongoose.Schema({
	idNo: {type: String, required: true},
	password: {type: String, min: 6, required: true},
	realName: {type: String, required: true},
	degree: {type: String, required: true},
	email: {type: String, required: true},
	mobileNo: {type: String, required: true},
	locker: {type: mongoose.Schema.Types.ObjectId, ref: 'locker', required: false}
})

var User = mongoose.model("users", userSchema);

exports.create = function(obj, next){
	const user = new User(obj);
	
	user.save(function(err, doc){
		next(err, doc)
	})
}

exports.getOne = function(query, next){
	User.findOne(query, function(err, user){
		next(err, user)
	})
}

exports.updateProfile = function(user, query, next){
	User.updateOne(user, query, function(err, user){
		next(err, user)
	})
}

exports.addCurrLocker = function(user, query, next){
	User.updateOne(user, query, function(err, user){
		next(err, user)
	})
}

exports.findCurrUserLocker = function(query, next){
	User.findOne(query, function(err, user){
		next(err, user)
	})
}

exports.lockerChange = function(user, query, next){
	User.updateOne(user, query, function(err, user){
		next(err, user)
	})
}

exports.loadRequests = function(next){
	User.find({locker: {$ne: null}}, function(err, requests){
		next(err, requests)
	})
}