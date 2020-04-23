const router = require('express').Router();
const {isPrivate} = require('..//middlewares/checkAuth')

router.get(["/", "/home", "/home.html", "/homepage"], function(req, res){
    if(req.session.idNo){
		console.log(req.session.idNo)
		
		if(req.session.idNo == "admin"){
			res.render("admin_home", {
				idNo : req.session.idNo, 
				password : req.session.password
			})
		}
		else{
			res.render("home", {
				idNo : req.session.idNo, 
				password : req.session.password
			})
		}
	}
	else{
		res.render("login")
	}
	
})

module.exports = router;