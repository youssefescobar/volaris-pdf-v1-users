const express = require('express')
const Router = express.Router()
const protect = require('../middlewares/auth')
const {
    registerUser, 
    loginUser,
    myProfile
} = require('../controllers/usersController')

Router.post("/register", registerUser)
Router.post("/login", loginUser)
Router.get("/my-profile", protect, myProfile)

module.exports = Router