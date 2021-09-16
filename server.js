"use strict"

 const express = require('express');
 const app = express();
 const cors = require('cors');
 app.use(cors());
 require('dotenv').config();
 const handleWeather = require('./controllers/weatherController');
 const handleMovies = require('./controllers/movieController'); 

const PORT = process.env.PORT;


app.get('/test',(req,res)=>
{
     res.status(200).json('testroute');
});


app.get('/',(req,res)=>
{
     res.status(200).json('deployed');
});



//WitherEndPoint
app.get('/weather',handleWeather);


//movie Endpoint
app.get('/movies',handleMovies);


app.listen(PORT,()=>{
    console.log("Listen in port"+PORT);
});



