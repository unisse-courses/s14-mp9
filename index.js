const express = require('express')
const session = require('express-session')
const http = require('http')
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const path = require("path")
const hbs = require("handlebars")
const ehbs = require("express-handlebars")

const {User} = require("./locker_user.js")

const {Location} = require("./location.js")
const {Locker} = require("./locker.js")
const {LockerReservation} = require("./locker.js")

//const {LockerReservation} = require("./locker.js")
//const {PendingAbandonRequestLockers} = require("./locker.js")

const app = express();
const port = 3000;

const url = "mongodb+srv://TilapiaRoger:depeche||N0D3@cluster0-lsr8q.mongodb.net/lockerdb"

mongoose.Promise = global.Promise;
mongoose.connect(url, {
	useNewUrlParser: true
})

const urlencoder = bodyparser.urlencoded({
	extended: true
});

/*app.engine('hbs', ehbs({
	extname: 'hbs',
	defaultView: 'main',
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, '/views/partials')
}))

app.set('view engine', 'hbs')*/

app.use(cookieparser())
app.use(express.static(__dirname + "/public"))
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "secret",
	name: "locker-cookie",
	cookie: {
		maxAge: 1000*60*60*224*365*5
	}
}))

//handlebars.registerHelper(req, res)

app.get(["/", "/home", "/home.html", "/homepage"], function(req, res){
	
	//res.render("home.hbs")
    if(req.session.idNo){
		console.log(req.session.idNo)
		
		if(req.session.idNo == "admin"){
			res.render("admin_home.hbs")
		}
		else{
			res.render("home.hbs", {
				idNo : req.session.idNo, 
				password : req.session.password
			})
		}
	}
	else{
		res.sendFile(__dirname + "/public/main.html")
	}
	
})

app.post("/login", urlencoder, function(req, res){
    var idNo,
	password,
	realName,
	degree,
	email,
	mobileNo;
	
	idNo = req.body.idNo;
	password = req.body.password;
	
	if(req.body.idNo == "admin" && req.body.password == "password"){
		req.session.idNo = "admin";
		req.session.password = "password";
		res.redirect("/")
	}
	else{
		User.findOne(
			{
				idNo: idNo,
				password: password
			},
			function(err, doc){
				if(err){
					res.send(err)
				}
				else if(!doc){
					res.send("User does not exist.")
				}
				else{
					console.log(doc)

					req.session.idNo = doc.idNo;
					req.session.password = doc.password;
					res.redirect("/")
				}
			}
		)
	}
	
})

app.post("/register", urlencoder, function(req, res){
    var idNo,
	password,
	realName,
	degree,
	email,
	mobileNo;
	
	idNo = req.body.newIdNo;
	password = req.body.newPassword;
	realName = req.body.newFullName;
	degree = req.body.newDegree;
	email = req.body.newEmail;
	mobileNo = req.body.newMobileNo;
	
	let user = new User({
		idNo,
		password,
		realName,
		degree,
		email,
		mobileNo
	});
	
	user.save().then(
		function(doc){
			req.session.idNo = doc.idNo;
			req.session.password = doc.password;
			
			res.redirect("/");
		},
		function(err){
			res.redirect(err)
		}
	);
})

app.get("/view-lockers", function(req, res){
	Location.find({
	
	},
	function(err, docs){
		if(err){
			res.render("admin_manage_lockers.hbs", {
				err
			})
		}
		else{
			var locationList = docs;
			Locker.find({
				
			},
			function(err, docs){
				if(err){
					
				}
				else{
					var err, msg;
	
					err = req.session.err;
					msg = req.session.msg;

					req.session.err = null;
					req.session.msg = null;
					
					res.render("locker_view.hbs", {
						idNo: req.session.idNo, 
						password: req.session.password,
						locations: locationList,
						err,
						msg
					})
					
				}
			})
			
		}
	})
})

app.get("/get-lockers", function(req, res){
	Locker.find({
						
	},
	function(err, docs){
		if(err){

		}
		else{
			res.send(docs)
		}
	})
	
})

app.get("/get-locations", function(req, res){
	Location.find({
						
	},
	function(err, docs){
		if(err){

		}
		else{
			res.send(docs)
		}
	})
	
})

app.get("/get-locker-reserves", function(req, res){
	LockerReservation.find({
						
	},
	function(err, docs){
		if(err){

		}
		else{
			res.send(docs)
		}
	})
	
})


app.post("/confirm-reservation", urlencoder, function(req, res){
	var userId, lockerNo,
	location
	
	userId = req.body.userIdSelector;
	lockerNo = req.body.selectedLocker;
	location = req.body.selectedLocation;
	
	Locker.findOne(
		{
		lockerNo: lockerNo,
		location: location
		},
		function(err, doc){
			if(err){
			   res.send(err)
			}
			else if(!doc){
				res.send("Location does not exist.")
			}
			else{
				var studentIdNo,
					Locker,
					status;
				
				studentIdNo = userId;
				Locker = doc;
				status = "reserved"
				
				let lockerReserve = LockerReservation({
					studentIdNo,
					Locker,
					status
				})

				lockerReserve.save().then(
					function(doc){
						req.session.studentIdNo = doc.studentIdNo;
						req.session.Locker = doc.Locker;
						req.session.status = doc.status;

						res.redirect("/view-lockers");
					},
					function(err){
						res.redirect(err)
					}
				);
			}
	})
})

app.post("/cancel-reservation", urlencoder, function(req, res){
	var userId, lockerNo,
	location
	
	LockerReservation.deleteOne({
		studentIdNo: req.session.idNo
		},
		function(err, obj){
			if(err){
			   res.send(err)
			}
			else if(!result){
				res.send("User does not exist.")
			}
			else{
				console.log(result)
				res.redirect("/current-locker");
			}
		}
	);
})

app.get("/current-locker", function(req, res){
	LockerReservation.findOne(
		{
		studentIdNo: req.session.idNo
		},
		function(err, doc){
			if(err){
			   res.send(err)
			}
			else if(!doc){
				res.render("current_locker.hbs", {
					idNo: req.session.idNo, 
					password: req.session.password,
					reserveExists: false
				})
			}
			else{
				res.render("current_locker.hbs", {
					idNo: req.session.idNo, 
					password: req.session.password,
					reserveExists: true, 
					currentLocker: doc
				})
			}
		}
	)
})

app.post("/abandon-locker", urlencoder, function(req, res){
	var userId, lockerNo,
	location
	
	LockerReservation.updateOne({
		studentIdNo: req.session.idNo
		},
		{
			status: "abandoned"
		},
		function(err, obj){
			if(err){
			   res.send(err)
			}
			else if(!result){
				res.send("User does not exist.")
			}
			else{
				console.log(result)
				res.redirect("/current-locker");
			}
		}
	);
})

app.post("/search", urlencoder, function(req, res){
	var result, criteria;
	
	criteria = req.body.criteria
	result = req.body.searchResult
	
	if(criteria == "location"){
	   	Locker.find({
			location: result
		},
		function(err, docs){
			if(err){

			}
			else{
				res.render("search.hbs", {
					idNo: req.session.idNo, 
					password: req.session.password,
					result: result,
					lockers: docs
				})
			}
		})
	}
	else{
	   	Locker.find({
			lockerNo: result
		},
		function(err, docs){
			if(err){

			}
			else{
				res.render("search.hbs", {
					idNo: req.session.idNo, 
					password: req.session.password,
					result: result,
					lockers: docs
				})
			}
		})
	}
	
	
    
})


app.post("/profile", urlencoder, function(req, res){
	var idNo,
	password;

	idNo = req.body.idNo;
	password = req.body.password;
	
	console.log(idNo)
	console.log(password)
	
	User.findOne(
		{
		idNo: idNo,
		password: password
		},
		function(err, doc){
			if(err){
			   res.send(err)
			}
			else if(!doc){
				res.send("User does not exist.")
			}
			else{
				res.render("profile.hbs", {
					user: doc,
					idNo: req.session.idNo,
					password: req.session.password
				})
			}
		}
	)
})

app.post("/edit-profile", urlencoder, function(req, res){
	var idNo,
	password;

	idNo = req.body.idNo;
	password = req.body.password;
	
	console.log(idNo)
	console.log(password)
	
	User.findOne(
		{
		idNo: idNo,
		password: password
		},
		function(err, doc){
			if(err){
			   res.send(err)
			}
			else if(!doc){
				res.send("User does not exist.")
			}
			else{
				res.render("edit_profile.hbs", {
					user: doc,
					idNo: req.session.idNo,
					password: req.session.password
				})
			}
		}
	)
})

app.post("/confirm-edit-profile", urlencoder, function(req, res){
	let user = {
		idNo: req.session.idNo,
		password: req.session.password
	}
	
	console.log(user.idNo + " edited.")
	
	User.updateOne(user, {
		realName: req.body.realName,
		degree: req.body.degree,
		email: req.body.email,
		mobileNo: req.body.mobileNo
	},
	function(err, result){
		if(err){
		   res.send(err)
		}
		else if(!result){
			res.send("User does not exist.")
		}
		else{
			console.log(result)
			res.render("edit_profile.hbs", {
				user: req.body,
				idNo: req.session.idNo,
				password: req.session.password
			})
		}
	})
})

app.get("/manage-lockers", function(req, res){
	var err, msg;
	
	err = req.session.err;
	msg = req.session.msg;
	
	req.session.err = null;
	req.session.msg = null;
	
	Location.find({
	
	},
	function(err, docs){
		if(err){
			res.render("admin_manage_lockers.hbs", {
				err
			})
		}
		else{
			var locationList = docs;
			Locker.find({
				
			},
			function(err, docs){
				if(err){
					
				}
				else{
					res.render("admin_manage_lockers.hbs", {
						locations: locationList,
						err,
						msg
					})
				}
			})
			
		}
	})
    
})

app.post("/add-location", urlencoder, function(req, res){
    var locationName,
	nTotalLockers,
	availableLockers;
	
	locationName = req.body.newLocationName;
	nTotalLockers = 0;
	availableLockers = 0;
	
	let location = new Location({
		locationName,
		nTotalLockers,
		availableLockers
	});
	
	location.save().then(
		function(doc){
			req.session.locationName = doc.locationName;
			req.session.nTotalLockers = doc.nTotalLockers;
			req.session.availableLockers = doc.availableLockers;
			
			res.redirect("/manage-lockers")
		},
		function(err){
			res.redirect(err)
		}
	);
})

app.post("/delete-location", urlencoder, function(req, res){
    var locationName,
	nTotalLockers,
	availableLockers;
	
	locationName = req.body.newLocationName;
	nTotalLockers = 0;
	availableLockers = 0;
	
	let location = new Location({
		locationName,
		nTotalLockers,
		availableLockers
	});
	
	Location.deleteOne({
		locationName: req.body.locationName
		},
		function(err, obj){
			if(err){
			   res.send(err)
			}
			else if(!result){
				res.send("User does not exist.")
			}
			else{
				console.log(result)
				res.redirect("/manage-lockers")
			}
		}
	);
})

app.post("/add-locker", urlencoder, function(req, res){
	var locationName;
	
	locationName = req.body.selectedLocation;
	
	console.log(locationName)
	
	Location.updateOne(
		{
		locationName: locationName
		},
		{
			$inc: {
				nTotalLockers: 1,
				availableLockers: 1
			}
		},
		function(err, doc){
			if(err){
			   res.send(err)
			}
			else if(!doc){
				res.send("Location does not exist.")
			}
			else{
				Location.findOne(
					{
					locationName: locationName
					},
					function(err, doc){
						if(err){
						   res.send(err)
						}
						else if(!doc){
							res.send("Location does not exist.")
						}
						else{
							var lockerNo,
							lockCode,
							location;

							console.log(doc.nTotalLockers)

							lockerNo = (doc.nTotalLockers + 100).toString();
							lockCode = req.body.newLockerCode;
							location = locationName;

							let locker = new Locker({
								lockerNo,
								lockCode,
								location
							});

							locker.save().then(
								function(doc){
									req.session.lockerNo = doc.lockerNo;
									req.session.lockCode = doc.lockCode;
									req.session.location = doc.location;

									res.redirect("/manage-lockers")
								},
								function(err){
									res.redirect(err)
							});
						}
				})
				
			}
		}
	)
})

app.post("/edit-locker", urlencoder, function(req, res){
	let locker = {
		location: req.body.selectedLocation,
		lockerNo: req.body.selectedLocationLockersNo
	}
	console.log(locker.location)
	console.log(locker.lockerNo)
	
	Locker.updateOne(locker, {
		lockCode: req.body.newLockerCode
	},
	function(err, result){
		if(err){
		   res.send(err)
		}
		else if(!result){
			res.send("Locker does not exist.")
		}
		else{
			console.log(result)
			res.redirect("/manage-lockers")
		}
	})
})


app.get("/manage-requests", function(req, res){
	Location.find({
		
	},
	function(err, docs){
		if(err){

		}
		else{
			res.render("admin_manage_requests.hbs", {
				locations: docs
			})
		}
	})
    
})

app.get("/get-requests", function(req, res){
	LockerReservation.find({
						
	},
	function(err, docs){
		if(err){

		}
		else{
			res.send(docs)
		}
	})
	
})

app.post("/own-request-results", urlencoder, function(req, res){
	let lockerReserve = {
		studentIdNo: req.body.reserveCheck
	}
	
	var request = req.body.request;
	
	if(request = "Accept Request(s)"){
	   	LockerReservation.updateMany({studentIdNo: req.body.reserveCheck}, {
			status: "owned"
		},
		function(err, docs){
			if(err){

			}
			else{
				res.redirect("/manage-requests")
			}
		})
	}
	else{
	   
	}
})

app.post("/abandon-accept-results", urlencoder, function(req, res){
	var request = req.body.request;
	
	if(request = "Accept Request(s)"){
	   
	}
	else{
	   
	}
})


app.get("/logout", function(req, res){
    req.session.destroy(
		function(err){
			console.log("Logged out.")
		}
	)
	res.redirect("/")
})

app.listen(port, function(){
    console.log("Connected to " + port)
})