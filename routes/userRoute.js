const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate} = require('..//middlewares/checkAuth')

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
			res.render("profile", {
				reserved: false,
				user: profileDoc,
				idNo: req.session.idNo,
				password: req.session.password
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
			res.render("edit_profile", {
				reserved: false,
				user: profileDoc,
				idNo: req.session.idNo,
				password: req.session.password
			})
		}
	})
})

router.get('/current-locker', controller.currentLocker)
router.post('/cancel-reservation', controller.cancelReserveLocker)
router.post('/abandon-locker', controller.abandonLocker)
router.post('/cancel-abandonment', controller.cancelAbandonLocker)

router.get('/view-lockers', controller.viewLockers)
router.post('/confirm-reservation', controller.reserveLocker)

router.post('/search', controller.search)

router.post('/profile', controller.profile)
router.post('/edit-profile', controller.profileEdit)
router.post('/confirm-edit-profile', controller.profileEditConfirm)


module.exports = router;