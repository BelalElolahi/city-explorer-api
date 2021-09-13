"use strict"
 const express = require('express');
 const app = express();
 const cors = require('cors');
 app.use(cors());
 const weatherData = require('./Data/weatherData.json');
require('dotenv').config();
const PORT = process.env.PORT;


//Create a end point 



app.get('/weather_data',(req,res)=>{
     
    
    let lat1 = Number(req.query.lat);
    let lon1 = Number(req.query.lon);
    

    if(lat1&&lon1){

        let result = [];
         function HasLatLon(element) {
            return element.lat === lat1 && element.lon === lon1;
          }
         result.push( weatherData.find(HasLatLon));

         console.log(result);


         if (result.length>0)
         {
            let city = result[0];
            console.log(city);
              
            let days = city.data.map(day=>{
                return {
                    day:day.valid_date,
                    deccription:day.weather.description
                }
            });
            /*let custmResponse ={
                day:days,
                name:city.city_name
            }*/
            res.status(200).json(days);

         } else 
         {
            res.status(404).send("resources not found");
         }

        

    }else{
         res.status(400).send('please inter correct quiry');
    }
  
});


 app.listen(PORT,()=>{
      console.log(`we are listen : ${PORT}`)
 });


