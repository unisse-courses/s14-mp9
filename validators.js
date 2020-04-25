const {body} = require('express-validator')

const registerValid = [
	body('idNo').not().isEmpty().withMessage("ID number is required."),
	
	body('password').isLength({min: 6}).withMessage("Password should be at least 6 characters long."),
	
	body('realName').not().isEmpty().withMessage("Full name is required."),
	
	body('degree').not().isEmpty().withMessage("Degree program is required."),
	
	body('email').not().isEmpty().withMessage("E-mail is required")
	.isEmail().withMessage("Please provide a valid e-mail."),
	
	body('mobileNo').not().isEmpty().withMessage("Mobile number is required."),
];

const loginValid = [
	body('idNo').not().isEmpty().withMessage("ID number is required"),
	
	body('password').not().isEmpty().withMessage("Password is required")
];

const manageLockersValid = [
	body('lockCode').isLength({min: 3, max: 4}).withMessage("Locker code should be 3 to 4 digits long.")
];

const manageLocationsValid = [
	body('newLocationName').not().isEmpty().withMessage("Location name is required.")
]

const manageDatesValid = [
	body('termStart').not().isEmpty().withMessage("Term start date is required."),
	
	body('termEnd').not().isEmpty().withMessage("Term end date is required."),	
]

const editProfileValid = [
	body('realName').not().isEmpty().withMessage("Full name is required"),
	body('degree').not().isEmpty().withMessage("Degree program is required."),
	body('email').not().isEmpty().withMessage("E-mail is required.")
	.isEmail().withMessage("Please provide a valid e-mail."),
	body('mobileNo').not().isEmpty().withMessage("Locker code should be 3 to 4 digits long.")
]

const requestValid = [
	body('reserveCheck').not().isEmpty().withMessage("Please select at least one request to accept or reject.")
]

module.exports = { registerValid, loginValid, manageLockersValid, editProfileValid, manageLocationsValid, manageDatesValid, requestValid }