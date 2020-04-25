const router = require('express').Router();
const controller = require('../controllers/controller')
const userModel = require('../models/locker_user');
const lockerModel = require('../models/locker');
const locationModel = require('../models/location');
const termDateModel = require('../models/term_dates');
const {isPublic, isPrivate, isNavigated, isLockerManaged, isRequestsManaged} = require('..//middlewares/checkAuth')
const { loginValid, registerValid, manageLockersValid, manageLocationsValid, manageDatesValid } = require('../validators.js')

/*lockers*/
router.get('/manage-lockers', isNavigated, controller.manageLockers)

router.post('/add-locker', isLockerManaged, manageLockersValid, controller.addLocker)
router.post('/edit-locker', isLockerManaged, manageLockersValid, controller.editLocker)

router.post('/add-location', isLockerManaged, manageLocationsValid, controller.addLocation)
router.post('/delete-location', isLockerManaged, controller.deleteLocation)

/*requests*/
router.get('/manage-requests', isRequestsManaged, controller.manageRequests)

router.post('/own-request-results', isRequestsManaged, controller.ownershipResults)
router.post('/abandon-accept-results', isRequestsManaged, controller.abandonmentResults)

/*dates*/
router.post('/set-dates', isLockerManaged, manageDatesValid, controller.setDates)

module.exports = router;