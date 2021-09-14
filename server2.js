"use strict"
 const express = require('express');
 const app = express();
 const cors = require('cors');
 const axios = require('axios');
 app.use(cors());
 require('dotenv').config();
const PORT = process.env.PORT;



app.get('/',(req,res)=>{
    res.status(200).json();
     
});


let handleWeather = async (req,res)=>{

    let lat1 = Number(req.query.lat);
    let lon1 = Number(req.query.lon);
    let city_name = req.query.city;

    if (lat1&&lon1&&city_name){

        let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&key=${process.env.WITHER_API_KEY}&lat=${lat1}&lon=${lon1}`;
  
        let weatherAxiosData = await axios.get(url);
        let weatherData = weatherAxiosData.data;
        
      
        let cleaneData = weatherData.data.map(item =>{
            return new ForCast (item.datetime,item.weather.description);
        });
         
        console.log(weatherData.data);
          res.status(200).json(cleaneData);

    }
    else {
        res.status(404).send("resources not found");
    }

  
}
app.get('/weather',handleWeather);

app.listen(PORT,()=>{
    console.log("Listen in port"+PORT);
});


//model
class ForCast{
    constructor(date,description){
        this.date=date,
        this.description=description
    }
}