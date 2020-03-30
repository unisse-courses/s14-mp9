const mongoose = require('mongoose')

var lockerReserveSchema = mongoose.Schema({
	studentIdNo: String,
	Locker: lockerSchema,
	status: String
})

var LockerReservation = mongoose.model("lockerReserves", lockerReserveSchema);

module.exports = {
	LockerReservation
}
