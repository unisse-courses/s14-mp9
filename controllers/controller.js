const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const { validationResult } = require('express-validator')

exports.register = (req, res) =>{
	const errors = validationResult(req)

	if(errors.isEmpty()){
		const {
			idNo,
			password,
			realName,
			degree,
			email,
			mobileNo
		} = req.body
		
	  	userModel.getOne({idNo: idNo}, (err, result)=>{
			if(result){
				console.log(result)
				
				req.flash('fail_msg', "The user already exists. Please login.");
				res.redirect('/login')
			}
			else{
				const bcrypt = require('bcrypt');
				const saltRounds = 10;
				
				bcrypt.hash(password, saltRounds, (err, hashed)=>{
					const newUser = {
						idNo,
						password: hashed,
						realName,
						degree,
						email,
						mobileNo
					}
					
					userModel.create(newUser, (err, user)=>{
						if(err){
							req.flash('fail_msg', "An error occurred. Please try again.");
							res.redirect('/register')
						}
						else{
							req.flash('success_msg',  "You are now registered! Now you can login below.");
							res.redirect('/login')
						}
					})
				})
			}
		})
	}
	else{
		const messages = errors.array().map((item)=> item.msg)
		
		req.flash('fail_msg', messages.join(' '));
		res.redirect('/register')
	}
	
	
}

exports.login = (req, res) =>{
	const errors = validationResult(req)
	
	if(errors.isEmpty()){
		const {
			idNo,
			password
		} = req.body
		
	  	userModel.getOne({idNo: idNo}, (err, user)=>{
			if(err){
				console.log(result)
				req.flash('fail_msg', "An error occurred. Please try again.");
				res.redirect('/login')
			}
			else{
				if(user){
					const bcrypt = require('bcrypt');
					const saltRounds = 10;

					bcrypt.compare(password, user.password, (err, result)=>{
						if(result){
							req.session.idNo = user.idNo;
							req.session.password = user.password;

							res.redirect('/')
						}
						else{
							req.flash('fail_msg',  "Incorrect password. Try again.");
							res.redirect('/login')
						}
					})
				}
				else{
					req.flash('fail_msg', "This user does not exist. Please register.");
					res.redirect('/login')
				}
			}
		})
	}
	else{
		const messages = errors.array().map((item)=> item.msg)
		
		req.flash('fail_msg', messages.join(' '));
		res.redirect('/login')
	}
}

exports.logoutUser = (req, res) =>{
	if(req.session){
		req.session.destroy(()=>{
			res.clearCookie('connect.sid');
			res.redirect('/login')
		})
	}
}

/*user*/
exports.profile = (req, res) =>{
	res.redirect('/profile')
}

exports.profileEdit = (req, res) =>{
	res.redirect('/edit-profile')
}

exports.profileEditConfirm = (req, res) =>{
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		realName,
		degree,
		email,
		mobileNo
	} = req.body
	
	userModel.updateProfile(user, {
		realName: realName,
		degree: degree,
		email: email,
		mobileNo: mobileNo
	}, 
	function(err, result){
		if(err){
			console.log(err)
			res.redirect("/edit-profile")
		}
		else if(!result){
			console.log("User error.")
			res.redirect("/edit-profile")
		}
		else{
			res.redirect("/edit-profile")
		}
	})
}

/*user lockers*/
exports.viewLockers = (req, res) => {
	res.render("locker_view", {
		idNo: req.session.idNo, 
		password: req.session.password
	})
}

exports.currentLocker = (req, res) => {
	var lockerId;
	
	const user = {
		idNo: req.session.idNo,
		password: req.session.password,
		locker: {$ne: null}
	}
	
	userModel.findCurrUserLocker(user,
		function(err, user){
			if(err){
				res.send(err)
			}
			else if(!user){
				res.render("current_locker", {
					idNo: req.session.idNo, 
					password: req.session.password,
					reserveExists: false
				})
			}
			else{
				lockerId = user.locker
				
				lockerModel.findCurrentLocker({
					_id: lockerId
				},
				function(err, locker){
					locationModel.getOne({
						_id: locker.location
					},
					function(err, location){
						res.render("current_locker", {
							idNo: req.session.idNo, 
							password: req.session.password,
							reserveExists: true,
							currentLocker: locker.toObject(),
							lockerLocation: location.locationName
						})
					})
					
				})
				
			}
		})
}

exports.abandonLocker = (req, res) => {
	var lockerId;
	
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		lockerNo,
		location
	} = req.body
	
	const curLocker = {
		lockerNo: lockerNo,
		location: location
	}
	
	lockerModel.statusChange(curLocker, {
		status: "abandoned"
	}, 
	function(err, locker){
		lockerModel.findCurrentLocker(curLocker, 
		function(err, locker){
			console.log(locker._id)
			lockerId = locker._id
			
			if(err){
				console.log(err)
				res.redirect("/current-locker");
			}
			else if(!locker){
				console.log("Locker error.")
				res.redirect("/current-locker");
			}
			else{
				res.redirect("/current-locker");
			}
		})
	})
}

exports.cancelAbandonLocker = (req, res) => {
	var lockerId;
	
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		lockerNo,
		location
	} = req.body
	
	const curLocker = {
		lockerNo: lockerNo,
		location: location
	}
	
	lockerModel.statusChange(curLocker, {
		status: "owned"
	}, 
	function(err, locker){
		lockerModel.findCurrentLocker(curLocker, 
		function(err, locker){
			console.log(locker._id)
			lockerId = locker._id
			
			if(err){
				console.log(err)
				res.redirect("/current-locker");
			}
			else if(!locker){
				console.log("Locker error.")
				res.redirect("/current-locker");
			}
			else{
				res.redirect("/current-locker");
			}
		})
	})
}

exports.reserveLocker = (req, res) => {
	var lockerId;
	
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		selectedLocation,
		selectedLocker
	} = req.body
	
	const curLocker = {
		lockerNo: selectedLocker,
		location: selectedLocation
	}
	
	lockerModel.statusChange(curLocker, {
		status: "reserved"
	}, 
	function(err, locker){
		lockerModel.findCurrentLocker(curLocker, 
		function(err, locker){
			console.log(locker._id)
			lockerId = locker._id
			
			userModel.addCurrLocker(user, {
				locker: lockerId
			}, 
			function(err, user){
				if(err){
					console.log(err)
					res.redirect("/view-lockers")
				}
				else if(!user){
					console.log("Locker error.")
					res.redirect("/view-lockers")
				}
				else{
					res.redirect("/view-lockers")
				}
			})
		})
	})
}

exports.cancelReserveLocker = (req, res) => {
	var lockerId;
	
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		lockerNo,
		location
	} = req.body
	
	const curLocker = {
		lockerNo: lockerNo,
		location: location
	}
	
	lockerModel.statusChange(curLocker, {
		status: "available"
	}, 
	function(err, locker){
		userModel.lockerChange(user, {
			locker: null
		}, 
		function(err, user){
			if(err){
				console.log(err)
				res.redirect("/current-locker")
			}
			else if(!user){
				console.log("Locker error.")
				res.redirect("/current-locker")
			}
			else{
				res.redirect("/current-locker")
			}
		})
	})
}

exports.search = (req, res) => {
	var result, criteria;
	
	criteria = req.body.criteria
	result = req.body.searchResult
	
	if(criteria == "location"){
		lockerModel.findResults({
			location: result
		},
		function(err, lockers){
			if(err){

			}
			else{
				var lockersResults = []

				lockers.forEach(function(doc){
					lockersResults.push(doc.toObject())
				})
				
				res.render("search", {
					idNo: req.session.idNo, 
					password: req.session.password,
					result: result,
					lockers: lockersResults
				})
			}
		})
	}
	else if(criteria == "lockerNo"){
		lockerModel.findResults({
			lockerNo: result
		},
		function(err, lockers){
			if(err){

			}
			else{
				var lockersResults = []

				lockers.forEach(function(doc){
					lockersResults.push(doc.toObject())
				})
				
				res.render("search", {
					idNo: req.session.idNo, 
					password: req.session.password,
					result: result,
					lockers: lockersResults
				})
			}
		})
	}
	else{
		req.flash('fail_locker_msg', "Please select a filter first.");
		res.redirect('/view-lockers')
	}
	
}

/*admin lockers*/
exports.manageLockers = (req, res) => {
	res.render("admin_manage_lockers", {
		idNo: req.session.idNo, 
		password: req.session.password
	})
}

exports.addLocker = (req, res) => {
	var locationId;
	
	const {
		selectedLocation,
		lockCode,
	} = req.body
	
	console.log(selectedLocation)
	
	locationModel.getOne({
		_id: selectedLocation
	}, function(err, location){
		
		var lockerCount;
		locationId = location._id

		lockerModel.countLockers({
			location: locationId
		}, function(err, count){
			lockerCount = count

			const newLocker = {
				lockerNo: (100 + lockerCount).toString(),
				location: locationId,
				lockCode,
				status: "available"
			}

			lockerModel.addLocker(newLocker, (err, locker)=>{
				if(err){
					console.log(err)
					req.flash('fail_locker_manage_msg', "An error occurred. Please try adding the locker again.");
					res.redirect('/manage-lockers')
				}
				else{
					req.flash('success_locker_manage_msg',  "Locker successfully added!");
					res.redirect('/manage-lockers')
				}
			})
		})
	})
}

exports.editLocker = (req, res) => {
	var locationId;
	
	const {
		selectedLocationLockersNo, 
		selectedLocation,
		lockCode,
		editType
	} = req.body
	
	locationModel.getOne({
		_id: selectedLocation
	}, function(err, location){
		var lockerCount;
		locationId = location._id
		
		var locker = {
			lockerNo: selectedLocationLockersNo,
			location: locationId, 
		}

		if(editType == "Delete Locker"){
			lockerModel.deleteLocker(locker, 
			function(err, locker){
				if(err){
					req.flash('fail_locker_manage_msg', "An error occurred. Please try deleting the locker again.");
					res.redirect('/manage-lockers')
				}
				else if(!locker){
					req.flash('fail_locker_manage_msg', "An error occurred. Please try deleting the locker again.");
					res.redirect('/manage-lockers')
				}
				else{
					req.flash('success_locker_manage_msg',  "Locker successfully deleted!");
					res.redirect('/manage-lockers')
				}
			})
		}
		else if(editType == "Edit Locker"){
			lockerModel.editLocker(locker, {
				lockCode: lockCode
			}, 
			function(err, locker){
				if(err){
					req.flash('fail_locker_manage_msg', "An error occurred. Please try editing the locker again.");
					res.redirect('/manage-lockers')
				}
				else if(!locker){
					req.flash('fail_locker_manage_msg', "An error occurred. Please try editing the locker again.");
					res.redirect('/manage-lockers')
				}
				else{
					req.flash('success_locker_manage_msg',  "Locker " + selectedLocationLockersNo + " successfully edited " + " with new code: " + lockCode);
					res.redirect('/manage-lockers')
				}
			})
		}
	})
	
	
}

exports.addLocation = (req, res) => {
	const {
		newLocationName
	} = req.body
	
	var newLocation = {
		locationName: newLocationName
	}
	
	locationModel.getOne(newLocation, function(err, location){
		if(err){
			req.flash('fail_locker_manage_msg', "An error occurred. Please try adding a location again.");
			res.redirect('/manage-lockers')
		}
		else if(!location){
			locationModel.addLocation(newLocation, (err, location)=>{
				if(err){
					console.log(err)
					req.flash('fail_locker_manage_msg', "An error occurred. Please try adding a location again.");
					res.redirect('/manage-lockers')
				}
				else{
					req.flash('success_locker_manage_msg',  "Location successfully added!");
					res.redirect('/manage-lockers')
				}
			})
		}
		else{
			req.flash('fail_locker_manage_msg', "Location with this name already exists. Please add a location with  a different name.");
			res.redirect('/manage-lockers')
		}
	})
	
	
}

exports.deleteLocation = (req, res) => {
	const {
		newLocationName
	} = req.body
	
	const newLocation = {
		locationName: newLocationName
	}
	
	/*const location = {
		locationName: newLocationName
	}
	
	locationModel.deleteLocker(locker, 
		function(err, locker){
			if(err){
				console.log(err)
				res.redirect('/manage-lockers')
			}
			else if(!locker){
				console.log("Locker error.")
				res.redirect('/manage-lockers')
			}
			else{
				res.redirect('/manage-lockers')
			}
		})*/
}

exports.manageRequests = (req, res) => {
	res.render("admin_manage_requests", {
		idNo: req.session.idNo, 
		password: req.session.password
	})
}

exports.ownershipResults = (req, res) => {
	var lockerId;
	
	const {
		reserveCheck
	} = req.body
	
	userModel.findCurrUserLocker({
		idNo: reserveCheck
	},
	function(err, user){
		const curLocker = {
			_id: user.locker
		}

		lockerModel.statusChange(curLocker, {
			status: "owned"
		}, 
		function(err, locker){
			if(err){
				console.log(err)
				res.redirect("/manage-requests")
			}
			else if(!user){
				console.log("Locker error.")
				res.redirect("/manage-requests")
			}
			else{
				res.redirect("/manage-requests")
			}
		})
	})
	
}

exports.abandonmentResults = (req, res) => {
	var lockerId;
	
	const {
		reserveCheck
	} = req.body
	
	userModel.findCurrUserLocker({
		idNo: reserveCheck
	},
	function(err, user){
		const curLocker = {
			_id: user.locker
		}

		lockerModel.statusChange(curLocker, {
			status: "available"
		}, 
		function(err, locker){
			userModel.lockerChange(user, {
				locker: null
			}, 
			function(err, user){
				if(err){
					console.log(err)
					res.redirect("/manage-requests")
				}
				else if(!user){
					console.log("Locker error.")
					res.redirect("/manage-requests")
				}
				else{
					res.redirect("/manage-requests")
				}
			})
		})
	})
}

exports.setDates = (req, res) => {
	const {
		termStart,
		termEnd
	} = req.body
	
	let dates = {
		start: termStart,
		end: termEnd
	}
	
	termDateModel.setDates(dates, function(err, dates){
		if(err){
			console.log(err)
			req.flash('fail_locker_manage_msg', "An error occurred. Please try setting the dates again.");
			res.redirect('/manage-lockers')
		}
		else{
			req.flash('success_locker_manage_msg',  "Dates successfully set!");
			res.redirect('/manage-lockers')
		}
	})
}

/*initialize*/
exports.initLockers = (req, res) => {
	lockerModel.loadLockers(function(err, lockers){
		res.send(lockers)
	})
}

exports.initLocations = (req, res) => {
	locationModel.loadLocations(function(err, locations){
		res.send(locations)
	})
}

exports.initRequests = (req, res) => {
	userModel.loadRequests(function(err, requests){
		console.log(requests)
		res.send(requests)
	})
}

exports.initTermDates = (req, res) => {
	termDateModel.loadTermDates(function(err, dates){
		res.send(dates)
	})
}

