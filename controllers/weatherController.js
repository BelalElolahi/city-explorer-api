"use strict"

const Weather = require('../Data/Weather');
const axios = require('axios');
require('dotenv').config();

const Cache = require('../helpers/Cache');

let cache = new Cache();








let handleWeather = async (req, res) => {
    let lat1 = Number(req.query.lat);
    let lon1 = Number(req.query.lon);
    let city_name = req.query.city;

    console.log(lat1 , lon1, city_name);
    
    

    let currentDate = new Date();
    console.log("the cache date : ", cache.date.getDate());
    if (cache.data.length > 0 && cache.date.getDate() === currentDate.getDate()&& lat1 === cache.id) {
        res.json(
            {
                "data": cache,
                "message": "data retrieved form the chache"
            }
        );
    
    } else {

        

        if (lat1 && lon1 && city_name) {

            let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&key=${process.env.WITHER_API_KEY}&lat=${lat1}&lon=${lon1}`;

            let weatherAxiosData = await axios.get(url);
            let weatherData = weatherAxiosData.data;

                console.log(weatherData.data);
            let cleaneData = weatherData.data.map(item => {
                return new Weather(item.datetime, item.weather.description);
            });

            cache.data = cleaneData;
            cache.id = lat1;
        
           
            //res.status(200).json(cleaneData);

            res.status(200).json({ "id":cache.id ,"data": cache.data, "message": "data is coming form the api" });

        }
        else {
            res.status(404).send("resources not found");
        }




    }




}

module.exports = handleWeather;