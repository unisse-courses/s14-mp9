const mongoose = require('mongoose')

var locationSchema = mongoose.Schema({
	locationName: String,
	nTotalLockers: Number,
	availableLockers: Number
})

var Location = mongoose.model("locations", locationSchema);

module.exports = {
	Location
}