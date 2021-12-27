const express = require("express");
const router = express.Router();

const checkAuth = require("../../middleware/check-auth");
const getNews = require('../../Controllers/News/news-controller');

router.get('/', checkAuth, getNews);

module.exports = router;