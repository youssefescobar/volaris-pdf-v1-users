const express = require('express')
const Router = express.Router()
const protect = require('../middlewares/auth')
const {
    registerUser, 
    loginUser
} = require('../controllers/usersController')

Router.post("/register", registerUser)
Router.post("/login", loginUser)

module.exports = Router