exports.isPrivate = (req, res, next) =>{
	if(req.session.idNo){
		return next()
	}
	else{
		res.redirect('/login')
	}
}

exports.isPublic = (req, res, next) =>{
	if(req.session.idNo){
		res.redirect('/')
	}
	else{
		return next()
	}
}