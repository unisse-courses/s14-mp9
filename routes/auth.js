const router = require('express').Router();
const controller = require('../controllers/controller')
const {isPublic, isPrivate} = require('..//middlewares/checkAuth')

router.get('/login', isPublic, (req, res) =>{
	res.render('login')
})

router.get('/register', isPublic, (req, res) =>{
	res.render('login')
})

const { registerValid, loginValid } = require('../validators.js')

router.post('/register', isPublic, registerValid, controller.register)
router.post('/login', isPublic, loginValid, controller.login)
router.get('/logout', isPrivate, controller.logoutUser)

module.exports = router;