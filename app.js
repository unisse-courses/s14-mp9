const express = require('express')
const session = require('express-session')
const http = require('http')
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const path = require("path")
const hbs = require("handlebars")
const ehbs = require("express-handlebars")

const flash = require("connect-flash")
const MongoStore = require('connect-mongo')(session)

const index = require('./routes/index')
const auth = require('./routes/auth')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const defaultInitRoute = require('./routes/defaultInitRoute')

const {User} = require("./models/locker_user.js")

const {Location} = require("./models/location.js")
const {Locker} = require("./models/locker.js")
const {LockerReservation} = require("./models/locker.js")
const {TermDates} = require("./models/term_dates.js")

const app = express();
const port = 3000;

app.listen(port, function(){
    console.log("Connected to " + port)
})

app.engine('hbs', ehbs({
	extname: 'hbs',
	defaultView: 'main',
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, '/views/partials')
}))

app.set('view engine', 'hbs')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
	extended: true
}))

app.use(cookieparser())
app.use(express.static(__dirname + "/public"))
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "secret",
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	name: "locker-cookie",
	cookie: {
		maxAge: 1000*60*60*224*365*5
	}
}))

app.use(flash())
app.use((req, res, next) =>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.fail_msg = req.flash('fail_msg');
	res.locals.success_locker_manage_msg = req.flash('success_locker_manage_msg');
	res.locals.fail_locker_manage_msg = req.flash('fail_locker_manage_msg');
	res.locals.success_locker_msg = req.flash('success_locker_msg');
	res.locals.fail_locker_msg = req.flash('fail_locker_msg');
	next()
})

app.use('/', defaultInitRoute)
app.use('/', index)
app.use('/', auth)
app.use('/', userRoute)
app.use('/', adminRoute)

//handlebars.registerHelper(req, res)

