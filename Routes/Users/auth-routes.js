const express = require('express');
const router = express.Router();

const { signUp, login, logout, refreshToken } = require('../../Controllers/Users/user-controller');
const checkAuth = require("../../middleware/check-auth");

router.post('/sign-up', signUp); //signup
router.post('/login', login); // login
router.get('/logout', checkAuth, logout); //logout;
router.get('/refreshToken', refreshToken) //get new access token

module.exports = router;