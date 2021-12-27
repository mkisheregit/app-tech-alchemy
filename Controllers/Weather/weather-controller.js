const axios = require("axios");
const url = require("url");

const getWeather = (req, res) => {
    const apiUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=28.70&lon=77.10&units=metric&exclude=hourly,minutely,current&appid=6c1c6cc3560ed6020d8eb3d6a0c3e184";
    const queryObject = url.parse(apiUrl, true).query;
    // console.log(queryObject.units || 'standard');

    axios
        .get(
            apiUrl
        )
        .then((response) => {
            let data = [];
            for (i = 0; i < 5; i++) {
                let eachDayData = response.data.daily[i];
                data.push({
                    date: new Date(eachDayData.dt * 1000).toDateString(),
                    temp: eachDayData.temp.day,
                    main: eachDayData.weather[0].main,
                    humidity: eachDayData.humidity,
                });
            }

            res.status(200).json({
                count: data.length,
                units: queryObject.units || 'standard',
                location: 'Delhi',
                data: data,
            });
        })
        .catch((error) => {
            res.status(404).json({ message: error.message });
        });
};
module.exports = getWeather;