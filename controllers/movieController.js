"ues strict"

const Movie = require('../Data/Movi');
const axios = require('axios');
require('dotenv').config();


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
         
       
          //res.status(200).json(cleaneData);
          res.status(200).send(JSON.stringify(cleaneData));

    }
    else {
        res.status(404).send("resources not found");
    }

  
}

module.exports= handleMovies ;