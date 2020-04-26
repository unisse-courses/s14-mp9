const router = require('express').Router();
const userModel = require('../models/locker_user');
const {isPrivate} = require('..//middlewares/checkAuth')

router.get(["/", "/home", "/home.html", "/homepage"], function(req, res){
    if(req.session.idNo){
		if(req.session.idNo == "admin"){
			res.render("admin_home", {
				idNo : req.session.idNo,
				userIdCode: req.session.userIdCode
			})
			
		}
		else{
			res.render("home", {
				idNo: req.session.idNo,
				userIdCode: req.session.userIdCode
			})
		}
	}
	else{
		res.render("login")
	}
	
})

module.exports = router;