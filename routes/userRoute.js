const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate, isProfileEdited, isSearched, isNavigated, isLockerReserved} = require('..//middlewares/checkAuth')
const { editProfileValid, searchValid } = require('../validators.js')

router.get('/current-locker', isNavigated, controller.currentLocker)
router.post('/cancel-reservation', isNavigated, controller.cancelReserveLocker)
router.post('/abandon-locker', isNavigated, controller.abandonLocker)
router.post('/cancel-abandonment', isNavigated, controller.cancelAbandonLocker)

router.get('/view-lockers', isNavigated, controller.viewLockers)
router.post('/confirm-reservation', isLockerReserved, controller.reserveLocker)

router.post('/search', controller.search)

router.get('/profile', isNavigated, controller.profile)
router.get('/edit-profile', isNavigated, controller.profileEdit)
router.post('/confirm-edit-profile', isProfileEdited, editProfileValid, controller.profileEditConfirm)

router.get('/about', controller.about)

module.exports = router;