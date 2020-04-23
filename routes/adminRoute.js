const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate} = require('..//middlewares/checkAuth')
const { loginValid, registerValid, manageLockersValid } = require('../validators.js')

/*lockers*/
router.get('/manage-lockers', controller.manageLockers)

router.post('/add-locker', manageLockersValid, controller.addLocker)
router.post('/edit-locker', manageLockersValid, controller.editLocker)

router.post('/add-location', controller.addLocation)
router.post('/delete-location', controller.deleteLocation)

/*requests*/
router.get('/manage-requests', controller.manageRequests)

router.post('/own-request-results', controller.ownershipResults)
router.post('/abandon-accept-results', controller.abandonmentResults)

/*dates*/
router.post('/set-dates', controller.setDates)

module.exports = router;