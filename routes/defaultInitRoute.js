const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate} = require('..//middlewares/checkAuth')


router.get('/get-lockers', controller.initLockers)
router.get('/get-locations', controller.initLocations)
router.get('/get-requests', controller.initRequests)
router.get('/get-term-dates', controller.initTermDates)

module.exports = router;