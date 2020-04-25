const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate, isProfileEdited, isSearched, isNavigated} = require('..//middlewares/checkAuth')
const { editProfileValid } = require('../validators.js')

router.get('/current-locker', isNavigated, controller.currentLocker)
router.post('/cancel-reservation', controller.cancelReserveLocker)
router.post('/abandon-locker', controller.abandonLocker)
router.post('/cancel-abandonment', controller.cancelAbandonLocker)

router.get('/view-lockers', isNavigated, controller.viewLockers)
router.post('/confirm-reservation', controller.reserveLocker)

router.post('/search', isSearched, controller.search)

router.post('/profile', isNavigated, controller.profile)
router.get('/edit-profile', isNavigated, controller.profileEdit)
router.post('/confirm-edit-profile', isProfileEdited, editProfileValid, controller.profileEditConfirm)


module.exports = router;