const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	idNo: String,
	password: String,
	realName: String,
	degree: String,
	email: String,
	mobileNo: String
})

var User = mongoose.model("users", userSchema);

module.exports = {
	User
}