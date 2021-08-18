'use strict'

const service = require('../../service/token')
const csrf = require('../../service/csrf')
const u = require('../../helpers/utils')


function isAuth(req, res, next)
{
	if(!req.headers.autorization)
		return res.status(403).send( u.response(false, "",  `Autorizacion requerida`))

	const token = req.headers.autorization.split(" ")[1]

	service.decodeToken(token)
		   .then(response => {
		   		req.user = response
		   		next()
		   })
		   .catch(response => {
		   		return res.status(request.status).send( u.response(false, "", response.message) )
		   })
}

function isCSRF(req, res, next)
{
	csrf.createCSRF()
	next()
}


module.exports = {
	isAuth,
	isCSRF
}