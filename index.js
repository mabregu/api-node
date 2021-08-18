'use strict'

const config = require('./config/app')
const port = config.port
if(process.env.NODE_ENV=="development")
	require('dotenv').config();

const app = require('./app')

app.listen(config.port, ()=>{
	console.log(`api corriendo en ${port}`)
})