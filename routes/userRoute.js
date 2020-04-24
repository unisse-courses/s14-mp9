const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate, isProfileEdited, isSearched, isNavigated} = require('..//middlewares/checkAuth')
const { editProfileValid } = require('../validators.js')

router.get('/profile', (req, res) =>{
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
})

router.get('/edit-profile', (req, res) =>{
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
})

router.get('/current-locker', isNavigated, controller.currentLocker)
router.post('/cancel-reservation', controller.cancelReserveLocker)
router.post('/abandon-locker', controller.abandonLocker)
router.post('/cancel-abandonment', controller.cancelAbandonLocker)

router.get('/view-lockers', isNavigated, controller.viewLockers)
router.post('/confirm-reservation', controller.reserveLocker)

router.post('/search', isSearched, controller.search)

router.post('/profile', isNavigated, controller.profile)
router.post('/edit-profile', controller.profileEdit)
router.post('/confirm-edit-profile', isProfileEdited, editProfileValid, controller.profileEditConfirm)


module.exports = router;