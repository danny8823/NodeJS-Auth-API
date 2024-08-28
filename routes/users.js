const express = require('express')
const userCtrl = require('../controller/user')
const isAuthenticated = require('../middlewares/isAuth')

const router = express.Router()

// ! REGISTER
router.post('/api/users/register', userCtrl.register)

// ! LOGIN
router.post('/api/users/login', userCtrl.login)

// ! PROFILE
router.get('/api/users/profile',isAuthenticated, userCtrl.profile)

module.exports = router