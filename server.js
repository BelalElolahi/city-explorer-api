"use strict"
 const express = require('express');
 const app = express();
 const cors = require('cors');
 const axios = require('axios');
 app.use(cors());
 require('dotenv').config();
const PORT = process.env.PORT;







//WitherEndPoint
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



let handleMovies = async (req,res)=>{

    let city = req.query.searchQuery;
    console.log(city);

    if (city){
            
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
        
  
        let moviesAxiosData = await axios.get(url);
        let moviesData = moviesAxiosData.data;
        
       console.log(moviesData.results);
        let cleaneData = moviesData.results.map(item =>{
            return new Movie (item.title,item.overview,item.vote_average,item.vote_count,item.image_url,item.popularity,item.release_date);
        });
         
        console.log(moviesData.data);
          res.status(200).json(cleaneData);

    }
    else {
        res.status(404).send("resources not found");
    }

  
}
//movie Endpoint
app.get('/movies',handleMovies);

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

 

//model 
class Movie {
    constructor(title,overview,averageVotes,totalVotes,imageUrl,popularity,releasedOn){
         this.title=title,
         this.overview=overview,
         this.averageVotes = averageVotes,
         this.totalVotes= totalVotes,
         this.imageUrl = imageUrl,
         this.popularity= popularity,
         this.releasedOn = releasedOn

    }
}

