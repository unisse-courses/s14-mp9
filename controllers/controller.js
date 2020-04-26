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

exports.about = (req, res) =>{
	res.render("about", {
		idNo: req.session.idNo,
		password: req.session.password
	})
}

/*user*/
exports.profile = (req, res) =>{
	userModel.getOne({idNo: req.session.idNo}, (err, user)=>{
		var profileDoc = user.toObject();
		
		if(err){
			res.redirect("/")
		}
		else if(!user){
			res.redirect("/")
		}
		else{
			lockerModel.findCurrentLocker({
				_id: user.locker
			},
			function(err, locker){
				if(err){
					res.redirect("/")
				}
				else if(!locker){
					res.render("profile", {
						reserved: false,
						user: profileDoc,
						idNo: req.session.idNo,
						password: req.session.password
					})
				}
				else{
					locationModel.getOne({
						_id: locker.location
					},
					function(err, location){
						if(err){
							res.redirect("back")
						}
						else if(!user){
							res.redirect("back")
						}
						else{
							res.render("profile", {
								reserved: true,
								user: profileDoc,
								locker: locker.toObject(),
								lockerLocation: location.locationName,
								idNo: req.session.idNo,
								password: req.session.password
							})
						}
					})
				}
			})
			
		}
	})
}

exports.profileEdit = (req, res) =>{
	userModel.getOne({idNo: req.session.idNo}, (err, user)=>{
		var profileDoc = user.toObject();
		
		
		if(err){
			res.redirect("/profile")
		}
		else if(!user){
			res.redirect("/profile")
		}
		else{
			lockerModel.findCurrentLocker({
				_id: user.locker
			},
			function(err, locker){
				if(err){
					res.redirect("/profile")
				}
				else if(!locker){
					res.render("edit_profile", {
						reserved: false,
						user: profileDoc,
						idNo: req.session.idNo,
						password: req.session.password
					})
				}
				else{
					locationModel.getOne({
						_id: locker.location
					},
					function(err, location){
						if(err){
							res.redirect("/profile")
						}
						else if(!user){
							res.redirect("/profile")
						}
						else{
							res.render("edit_profile", {
								reserved: true,
								user: profileDoc,
								locker: locker.toObject(),
								lockerLocation: location.locationName,
								idNo: req.session.idNo,
								password: req.session.password
							})
						}
					})
				}
			})
			
		}
	})
}

exports.profileEditConfirm = (req, res) =>{
	const errors = validationResult(req)
	
	if(errors.isEmpty()){
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
				req.flash('fail_profile_msg', "An error occurred while trying to save the profile credentials.");
				res.redirect("/edit-profile")
			}
			else if(!result){
				req.flash('fail_profile_msg', "An error occurred while trying to save the profile credentials.");
				res.redirect("/edit-profile")
			}
			else{
				req.flash('success_profile_msg', "Profile successfully updated!");
				res.redirect("/edit-profile")
			}
		})
	}
	else{
		const messages = errors.array().map((item)=> item.msg)
		
		req.flash('fail_profile_msg', messages.join(' '));
		res.redirect('/edit-profile')
	}
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
	
	userModel.loadCurrentlocker(user,
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
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		lockerId
	} = req.body
	
	const curLocker = {
		_id: lockerId
	}
	
	lockerModel.statusChange(curLocker, {
		status: "abandoned"
	}, 
	function(err, lockers){
		if(err){
			req.flash('fail_status_msg', "An error occurred while trying to abandon the locker. Please try to abandon the locker again.");
			res.redirect("back")
		}
		else if(!lockers){
			req.flash('fail_status_msg', "An error occurred while trying to find the ID of the locker to abandon. Please try to abandon the locker again.");
			res.redirect("back")
		}
		else{
			req.flash('success_status_msg', "Locker successfully abandoned.");
			res.redirect("back")
		}
	})
}

exports.cancelAbandonLocker = (req, res) => {
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		lockerId
	} = req.body
	
	const curLocker = {
		_id: lockerId
	}
	
	lockerModel.statusChange(curLocker, {
		status: "owned"
	}, 
	function(err, lockers){
		if(err){
			req.flash('fail_status_msg', "An error occurred while trying to cancel the locker abandonment. Please try to cancel the locker abandonment again.");
			res.redirect("back")
		}
		else if(!lockers){
			req.flash('fail_status_msg', "An error occurred while trying to find the ID of the locker abandoned. Please try to cancel the locker abandonment again.");
			res.redirect("back")
		}
		else{
			req.flash('success_status_msg', "Locker abandonment successfully cancelled.");
			res.redirect("back")
		}
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
		function(err, lockers){
			lockerId = lockers._id
			
			userModel.addCurrLocker(user, {
				locker: lockerId
			}, 
			function(err, users){
				if(err){
					req.flash('fail_status_msg', "An error occurred while trying to reserve the locker. Please try to reserve the locker again");
					res.redirect("/view-lockers")
				}
				else if(!users){
					req.flash('fail_status_msg', "An error occurred while trying to to find the ID of the locker to be reserved. Please try to reserve the locker again");
					res.redirect("/view-lockers")
				}
				else{
					req.flash('success_status_msg', "Locker successfully reserved!");
					res.redirect("/view-lockers")
				}
			})
		})
	})
}

exports.cancelReserveLocker = (req, res) => {
	const user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	const {
		lockerId
	} = req.body
	
	const curLocker = {
		_id: lockerId
	}
	
	lockerModel.statusChange(curLocker, {
		status: "available"
	}, 
	function(err, lockers){
		userModel.lockerChange(user, {
			locker: null
		}, 
		function(err, users){
			if(err){
				req.flash('fail_status_msg', "An error occurred while trying to cancel the reservation. Please try to cancel the locker reservation again");
				res.redirect("back")
			}
			else if(!users){
				req.flash('fail_status_msg', "An error occurred while trying to find the ID of the locker reserved. Please try to cancel the locker reservation again");
				res.redirect("back")
			}
			else{
				req.flash('success_status_msg', "Locker reservation successfully cancelled.");
				res.redirect("back")
			}
		})
	})
}

exports.search = (req, res) => {
	var url = require("url")
	var locationId;
	
	var result, criteria;

	criteria = req.body.criteria
	result = req.body.searchResult

	const {
		searchResultLocker,
		searchResultLocation
	} = req.body

	if(criteria == "location"){
		var locationResult = {
			locationName: { $regex: result, $options: 'i' }
		};

		locationModel.getOne(locationResult,
		function(err, location){
			if(err){

			}
			else if(!location){
				res.render("search", {
					idNo: req.session.idNo, 
					password: req.session.password,
					result: result
				})
			}
			else{
				lockerModel.findResults({
					location: location._id
				},
				function(err, lockers){
					if(err){

					}
					else if(!lockers){
						res.render("search", {
							idNo: req.session.idNo, 
							password: req.session.password,
							result: result
						})
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
		})
	}
	else if(criteria == "lockerNo"){
		var resultNum;

		if(result.match(/^\d+$/)){
			resultNum = parseInt(result)
			if(resultNum >= 100 && resultNum <= 999){
				lockerModel.findResults({
					lockerNo: result
				},
				function(err, lockers){
					if(err){

					}
					else if(!lockers){
						res.render("search", {
							idNo: req.session.idNo, 
							password: req.session.password,
							result: result
						})
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
				req.flash('fail_locker_search_msg', "Locker search queries should be 3 digits.");

				res.redirect("/view-lockers")
			}
		}
		else{
			req.flash('fail_locker_search_msg', "Locker search queries should not contain letters.");

			res.redirect("/view-lockers")
		}
	}
	else{
		if(searchResultLocker == "" || searchResultLocation == "" || (searchResultLocker == "" && searchResultLocation == "")){
			req.flash('fail_locker_search_msg', "Please select a filter first for the simple search option or fill all of the forms for the advanced search option.");

			res.redirect("/view-lockers")
		}
		else{
			var locationResult = {
				locationName: { $regex: '^' + searchResultLocation }
			};

			locationModel.getOne(locationResult,
			function(err, location){
				if(err){

				}
				else{
					lockerModel.findResults({
						location: location._id,
						lockerNo: searchResultLocker
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
			})
		}
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
	const errors = validationResult(req)
	
	var locationId;
	
	if(errors.isEmpty()){
		const {
			selectedLocation,
			lockCode,
		} = req.body

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
	else{
		const messages = errors.array().map((item)=> item.msg)
		
		req.flash('fail_locker_manage_msg', messages.join(' '));
		res.redirect('/manage-lockers')
	}
}

exports.editLocker = (req, res) => {
	const errors = validationResult(req)
	
	var locationId;
	
	const {
		selectedLocationLockersNo, 
		selectedLocation,
		lockCode,
		editType
	} = req.body
	
	if(editType == "Delete Locker"){
		locationModel.getOne({
			_id: selectedLocation
		}, function(err, location){
			var lockerCount;
			locationId = location._id

			var locker = {
				lockerNo: selectedLocationLockersNo,
				location: locationId, 
			}

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
		})
	}
	else if(editType == "Edit Locker"){
		if(errors.isEmpty()){
			locationModel.getOne({
				_id: selectedLocation
			}, function(err, location){
				var lockerCount;
				locationId = location._id
				
				var locker = {
					lockerNo: selectedLocationLockersNo,
					location: locationId, 
				}

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
			})
		}
		else{
			const messages = errors.array().map((item)=> item.msg)

			req.flash('fail_locker_manage_msg', messages.join(' '));
			res.redirect('/manage-lockers')
		}
	}
	
	
}

exports.addLocation = (req, res) => {
	const errors = validationResult(req)
	
	if(errors.isEmpty()){
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
	else{
		const messages = errors.array().map((item)=> item.msg)
		
		req.flash('fail_locker_manage_msg', messages.join(' '));
		res.redirect('/manage-lockers')
	}
	
}

exports.deleteLocation = (req, res) => {
	const {
		selectedManageLocation
	} = req.body
	
	var locationId = selectedManageLocation
	var deletedLocation = {
		_id: selectedManageLocation
	}
	
	var locationCheckLockerArray = []
	
	locationModel.getOne(deletedLocation,
	function(err, location){
		if(err){
			req.flash('fail_locker_manage_msg', "An error occurred. Please try deleting a location again.");
			res.redirect('/manage-lockers')
		}
		else if(!location){
			req.flash('fail_locker_manage_msg', "An error occurred finding the selected location. Please try deleting a location again.");
			res.redirect('/manage-lockers')
		}
		else{
			lockerModel.findResults({
				location: location._id
			},
			function(err, lockers){
				if(err){
					req.flash('fail_locker_manage_msg', "An error occurred. Please try deleting a location again.");
					res.redirect('/manage-lockers')
				}
				else if(!lockers){
					req.flash('fail_locker_manage_msg', "An error occurred to find all lockers of this location. Please try deleting a location again.");
					res.redirect('/manage-lockers')
				}
				else{
					lockers.forEach(function(doc){
						locationCheckLockerArray.push(doc.status)
					})
					
					if(locationCheckLockerArray.includes("owned") ||
					  locationCheckLockerArray.includes("reserved") ||
					  locationCheckLockerArray.includes("abandoned")){
						req.flash('fail_locker_manage_msg', "This location contains lockers that are either reserved, owned, and/or abandoned. Please find a location without any occupied lockers, or wait for this location to have all of its lockers unoccupied or available before deleting it.");
						res.redirect('/manage-lockers')
					}
					else{
						lockerModel.clear({
							location: locationId
						},
						function(err, lockers){
							if(err){
								req.flash('fail_locker_manage_msg', "An error occurred. Please try deleting a location again.");
								res.redirect('/manage-lockers')
							}
							else if(!lockers){
								req.flash('fail_locker_manage_msg', "An error occurred fully deleting the lockers. Please try deleting a location again.");
								res.redirect('/manage-lockers')
							}
							else{
								locationModel.deleteLocation(deletedLocation,
								function(err, location){
									if(err){
										req.flash('fail_locker_manage_msg', "An error occurred. Please try deleting a location again.");
										res.redirect('/manage-lockers')
									}
									else if(!location){
										req.flash('fail_locker_manage_msg', "An error occurred finding the selected location. Please try deleting a location again.");
										res.redirect('/manage-lockers')
									}
									else{
										req.flash('success_locker_manage_msg',  "Location successfully deleted!");
										res.redirect('/manage-lockers')
									}
								})
							}
						})
						
					}
				}
			})
		}
	})
	
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
		request
	} = req.body
	
	const {
		reserveCheck
	} = req.body
	
	var checkedLockers = []
	
	if(request == "Accept Request(s)"){
		if(reserveCheck){
			lockerModel.statusChange({
				_id: req.body.reserveCheck
			}, {
				status: "owned"
			}, 
			function(err, lockers){
				if(err){
					req.flash('fail_request_msg',  "An error occurred while trying to find the ID's of the lockers to be accepted for ownership.");
					res.redirect("/manage-requests")
				}
				else if(!lockers){
					req.flash('fail_request_msg',  "Please select at least one ownership request to accept.");
					res.redirect("/manage-requests")
				}
				else{
					req.flash('success_request_msg',  "Ownership requests successfully accepted.");
					res.redirect("/manage-requests")
				}
			})
			
		}
		else{
			req.flash('fail_request_msg',  "Please select at least one ownership request to accept.");
			res.redirect("/manage-requests")
		}
	}
	else{
		if(reserveCheck){
			lockerModel.statusChange({
				_id: req.body.reserveCheck
			}, {
				status: "available"
			}, 
			function(err, lockers){
				userModel.lockerChange({
					locker: req.body.reserveCheck
				}, {
					locker: null
				}, 
				function(err, users){
					if(err){
						req.flash('fail_request_msg',  "An error occurred while trying to find the ID's of the lockers to be rejected for ownership.");
						res.redirect("/manage-requests")
					}
					else if(!users){
						req.flash('fail_request_msg',  "Please select at least one ownership request to reject.");
						res.redirect("/manage-requests")
					}
					else{
						if(req.body.reserveCheck == null){
							req.flash('fail_request_msg',  "Please select at least one ownership request to accept.");
						}
						else{
							req.flash('success_request_msg',  "Ownership requests successfully rejected.");
							res.redirect("/manage-requests")
						}
					}
				})
			})
		}
		else{
			req.flash('fail_request_msg',  "Please select at least one ownership request to reject.");
			res.redirect("/manage-requests")
		}
	}
	
}

exports.abandonmentResults = (req, res) => {
	var lockerId;
	
	const {
		request
	} = req.body
	
	const {
		abandonCheck
	} = req.body
	
	
	if(request == "Accept Request(s)"){
		if(abandonCheck){
			lockerModel.statusChange({
				_id: req.body.abandonCheck
			}, {
				status: "available"
			}, 
			function(err, lockers){
				userModel.lockerChange({
					locker: req.body.abandonCheck
				}, {
					locker: null
				}, 
				function(err, users){
					if(err){
						req.flash('fail_request_msg',  "An error occurred while trying to find the ID's of the lockers to be accepted for abandonment.");
						res.redirect("/manage-requests")
					}
					else if(!users){
						req.flash('fail_request_msg',  "Please select at least one abandonment request to accept.");
						res.redirect("/manage-requests")
					}
					else{
						req.flash('success_request_msg',  "Abandonment requests successfully accepted.");
						res.redirect("/manage-requests")
					}
				})
			})
		}
		else{
			req.flash('fail_request_msg',  "Please select at least one abandonment request to accept.");
			res.redirect("/manage-requests")
		}
	}
	else{
		if(abandonCheck){
			lockerModel.statusChange({
				_id: req.body.abandonCheck
			}, {
				status: "owned"
			}, 
			function(err, lockers){
				if(err){
					req.flash('fail_request_msg',  "n error occurred while trying to find the ID's of the lockers to be rejected for abandonment.");
					res.redirect("/manage-requests")
				}
				else if(!lockers){
					req.flash('fail_request_msg',  "Please select at least one abandonment request to reject.");
					res.redirect("/manage-requests")
				}
				else{
					req.flash('success_request_msg',  "Abandonment requests successfully rejected.");
					res.redirect("/manage-requests")
				}
			})
		}
		else{
			req.flash('fail_request_msg',  "Please select at least one abandonment request to accept.");
			res.redirect("/manage-requests")
		}
	}
}

exports.setDates = (req, res) => {
	const errors = validationResult(req)
	
	if(errors.isEmpty()){
		const {
			termStart,
			termEnd
		} = req.body

		let dates = {
			start: termStart,
			end: termEnd
		}
		if((termStart == "" && termEnd == "")){
			req.flash('fail_locker_manage_msg', "Please fill in all forms for the term start and end.");
			res.redirect('/manage-lockers')
		}
		else if(termEnd < termStart){
			req.flash('fail_locker_manage_msg', "Please set the term start date earlier than then term end one, not later.");
			res.redirect('/manage-lockers')
		}
		else{
			termDateModel.setDates(dates, function(err, dates){
				if(err){
					req.flash('fail_locker_manage_msg', "An error occurred. Please try setting the dates again.");
					res.redirect('/manage-lockers')
				}
				else{
					req.flash('success_locker_manage_msg',  "Dates successfully set!");
					res.redirect('/manage-lockers')
				}
			})
		}
	}
	else{
		const messages = errors.array().map((item)=> item.msg)
		
		req.flash('fail_locker_manage_msg', messages.join(' '));
		res.redirect('/manage-lockers')
	}
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
		res.send(requests)
	})
}

exports.initTermDates = (req, res) => {
	termDateModel.loadTermDates(function(err, dates){
		res.send(dates)
	})
}

