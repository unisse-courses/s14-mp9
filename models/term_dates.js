const mongoose = require('./connection')

var tdSchema = new mongoose.Schema({
	start: {type: Date, required: true},
	end: {type: Date, required: true},
})

var TermDates = mongoose.model("termdates", tdSchema);

exports.setDates = function(obj, next){
	const dates = new TermDates(obj)
	
	TermDates.deleteMany({}, 
	function(err, docs){
		if(err){

		}
		else{
		}
	})
	
	dates.save(function(err, dates){
		next(err, dates)
	})
}

exports.loadTermDates = function(next){
	TermDates.find({ }, function(err, dates){
		next(err, dates)
	})
}