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
		return next()
	}
	else{
		res.redirect('/edit-profile')
	}
}

exports.isLockerManaged = (req, res, next) =>{
	if(req.session.idNo){
		return next()
	}
	else{
		res.redirect('/manage-lockers')
	}
}

exports.isRequestsManaged = (req, res, next) =>{
	if(req.session.idNo){
		return next()
	}
	else{
		res.redirect('/manage-requests')
	}
}


exports.isSearched = (req, res, next) =>{
	if(req.session.idNo){
		return next()
	}
	else{
		res.redirect('/search')
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

exports.isLockerReserved = (req, res, next) =>{
	if(req.session.idNo){
		return next()
	}
	else{
		res.redirect('/view-lockers')
	}
}