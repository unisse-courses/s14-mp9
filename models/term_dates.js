const mongoose = require('mongoose')

var tdSchema = mongoose.Schema({
	start: Date,
	end: Date,
})

var TermDates = mongoose.model("termdates", tdSchema);

module.exports = {
	TermDates
}