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

exports.isProfileEdited = (req, res, next) =>{
	if(req.session.idNo){
		res.redirect('/edit-profile')
	}
	else{
		return next()
	}
}

exports.isSearched = (req, res, next) =>{
	if(req.session.idNo){
		res.redirect('/search')
	}
	else{
		return next()
	}
}

exports.isNavigated = (req, res, next) =>{
	if(req.session.idNo){
		return next()
	}
	else{
		res.redirect('back')
	}
}