const express = require('express');
const router = express.Router();

const getWeather = require('../../Controllers/Weather/weather-controller');

router.get('/', getWeather);

module.exports = router;