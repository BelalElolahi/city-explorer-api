"ues strict"

const Movie = require('../Data/Movi');
const axios = require('axios');
require('dotenv').config();
const Cache1 = require('../helpers/Cache1');

let cache1 = new Cache1();

let handleMovies = async (req,res)=>{

    let city = req.query.searchQuery;
    console.log(city);
    let currentDate = new Date();
    console.log("the cache date : ", cache1.date.getDate());
    if (cache1.data.length > 0 && cache1.date.getDate() === currentDate.getDate()&& city === cache1.cityName) {
        res.json(
            {
                "data": cache1,
                "message": "data retrieved form the chache"
            }
        );
    
    
    } else {



        if (city){
            
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
        
  
        let moviesAxiosData = await axios.get(url);
        let moviesData = moviesAxiosData.data;
        
       console.log(moviesData.results);
        let cleaneData = moviesData.results.map(item =>{
            return new Movie (item.title
                ,item.overview
                ,item.vote_average
                ,item.vote_count
                ,item.poster_path,
                item.popularity,
                item.release_date
                );
        });
        cache1.data= cleaneData;
        cache1.cityName = city;
       
          //res.status(200).json(cleaneData);
          res.json(
            {     
                "data": cache1.data,
                "message": "data retrieved form the API"
            }
        );


    }
    else {
        res.status(404).send("resources not found");
    }

}

  
}

module.exports= handleMovies ;