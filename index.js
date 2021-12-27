const express = require('express');
const mongoose = require('mongoose');

const newsRoutes = require('./Routes/News/news-route');
const weatherRoutes = require('./Routes/Weather/weather-route');
const userRoutes = require('./Routes/Users/auth-routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbURI = "mongodb://localhost:27017/tech-alchemy-db";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', userRoutes);
app.use('/news', newsRoutes);
app.use('/weather', weatherRoutes);

app.listen(3000, () => {
    console.log('server started');
})