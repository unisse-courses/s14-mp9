const mongoose = require('mongoose')

var lockerSchema = mongoose.Schema({
	lockerNo: String,
	lockCode: String,
	location: String
})

var Locker = mongoose.model("lockers", lockerSchema);

var lockerReserveSchema = mongoose.Schema({
	studentIdNo: String,
	Locker: lockerSchema,
	status: String
})

var LockerReservation = mongoose.model("lockerReserves", lockerReserveSchema);

module.exports = {
	Locker,
	LockerReservation
}


/*var lockerReservationSchema = mongoose.Schema({
	lockerNo : String,
	lockerStatus: String,
	reserveId : String,
	locker: lockerSchema
})

var LockerReservation = mongoose.model("lockerReservations", lockerReservationSchema);

module.exports = {
	LockerReservation
}

var abandonRequestLockerSchema = mongoose.Schema({
	lockerNo : String,
	location : String,
	abandonId : Boolean
})

var PendingAbandonRequestLockers = mongoose.model("pendingRequestedAbandonLockers", abandonRequestLockerSchema);

module.exports = {
	PendingAbandonRequestLockers
}*/