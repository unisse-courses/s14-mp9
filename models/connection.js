const mongoose = require('mongoose');
const {dbURL} = require('../config');
//const url = "mongodb+srv://TilapiaRoger:depeche||N0D3@cluster0-lsr8q.mongodb.net/lockerdb"

mongoose.connect(dbURL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useFindAndModify: false
})

module.exports = mongoose

