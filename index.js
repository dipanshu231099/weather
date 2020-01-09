const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '5480fd443a5bb2bbc47748bb808752c7';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {
        weather: null,
        error: null
    });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5480fd443a5bb2bbc47748bb808752c7`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, please try again'
            });
        } else {
            let weather = JSON.parse(body)
            console.log(weather);
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please try again'
                });
            } else {
                res.render('index', {
                    temp: `${weather.main.temp}`,
                    feel: `${weather.main.feels_like}`,
                    temp_min: `${weather.main.temp_min}`,
                    temp_max: `${weather.main.temp_max}`,
                    wind_speed: `${weather.wind.speed}`,
                    error: null
                });
            }
        }
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})