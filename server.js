// url-weather: https://api.weatherbit.io/v2.0/forecast/daily
// url-movies: https://api.themoviedb.org/3/search/movie

'use strict';
const express = require('express');
const server = express();

const axios = require('axios');

const weather = require('./data/weather.json');

const cors = require('cors');
const { response } = require('express');
server.use(cors()); 


// localhost:3030
const PORT = process.env.PORT || 3030;
 require("dotenv").config();



 // localhost:3030/
 server.get('/',(req,res) =>{
    res.send('Home...');
})

// localhost:3030/test
server.get('/test',(req, res)=>{
  res.send('hello');
})

// localhost:3030/weatherData
server.get('/weatherData', (req, res)=>{
    res.send(weather);
})

// localhost:3030/lon-lat
server.get('/lon-lat', (req, res)=>{
    let dataArr =weather.map((city)=> {
        return [`longitude: ${city.lon}` , `latitude: ${city.lat}`];
    }) 
    res.send(dataArr);
})

// localhost:3030/movies?location=germany
server.get('/movies', async (req, res)=>{
  let location = req.query.location;
  let movieKey= process.env.MOVIE_API_KEY;
  let movieURL= `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${location}`;

  try{
    let movies = await axios.get(movieURL);
    // console.log(`${movies.data.results[0].id} resultdatanow`);
    let arrofMovies = [];
    movies.data.results.map(movie=> {
      arrofMovies.push(movie);
    });
    let arraytoObjs = arrofMovies.map(obj=> new Movies(obj));
   
    res.send(arraytoObjs);
    console.log(arrofMovies);
    // console.log (arrofMovies == true);

  }
  catch{
    res.status =500;
    res.send(`ERROR: MOVIE'S DATA NOT FOUND FOR REQUIRED LOCATION`);
  }

})
 class Movies {
   constructor(film){
     this.name = film.original_title,
     this.description = film.overview,
     this.poster = film.poster_path
   }

 }

// localhost:3030/searchCity?cityName=amman
server.get('/searchCity',async (req,res)=>{
     let cityName = req.query.cityName;
    //  console.log(`weather: ${weather} kjhkhkjhkjhkjhkjhkh`)
    let weatherKey= process.env.WEATHER_API_KEY;
    let weatherURL= `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherKey}`;
    // console.log("blah");
  try{
    let data =await axios.get(weatherURL);
    // console.log(`${data.data.data[0].pres} here the first one`);
    let receivedData = data.data;
    // console.log(receivedData);
    res.status=200;
    res.send(`City: ${receivedData.city_name}  -  Longitude: ${receivedData.lon}  -  Latitude: ${receivedData.lat}`);
  }
  catch{
    res.status =500;
    res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);

  }
})

// localhost:3030/cityData?cityName=paris
server.get('/cityData',async (req, res)=>{
  let cityName = req.query.cityName;
  let weatherKey= process.env.WEATHER_API_KEY;
  let weatherURL= `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherKey}`;
  console.log(`before ${cityName}`);
  try{
    let data =await axios.get(weatherURL);
    let receivedData = data.data;
    // console.log(receivedData);
    let cityData = receivedData.data.map(day => new Forecast(day));
    // console.log(cityData);
      res.status=200;
      res.send(cityData);


  }
  catch{
    res.status =500;
    res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);

  }
  
})

class Forecast{
  constructor(city){
      this.date= city.valid_date,
      this.description= city.weather.description
  }
}

server.listen(PORT, ()=>{
  console.log(`Listening to PORT ${PORT} o.O`);
})

// ---------------------------------------------------------------------
// ------------------------for lab 07 ----------------------------------
// ----------------------------------------------------------------------

// localhost:3030/searchCity?cityName=amman
// server.get('/searchCity', (req, res)=>{
//     let cityName = req.query.cityName;
//     console.log(cityName);

//     let cityFound = weather.find((city)=>{
//         let name = city.city_name;
//         // console.log(`name: ${name}`);
//         if (name.toLocaleLowerCase() == cityName.toLocaleLowerCase()){
//         // console.log("inside find");
//         return city;}   
//     })
//     // console.log(cityFound);
//     if(cityFound){
//         res.status = 200;
//         res.send(`City: ${cityFound.city_name}  -  Longitude: ${cityFound.lon}  -  Latitude: ${cityFound.lat}`);
//     }else if (! cityFound){
//         res.status =500;
//         res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);
//     }
// })


// localhost:3030/cityData?cityName=paris
// server.get('/cityData', (req, res)=>{
//   let cityName = req.query.cityName;
//   let cityValidation = weather.find((city)=>{
//       return (city.city_name.toLocaleLowerCase() == cityName.toLocaleLowerCase());
//   })
// //   console.log("cityValidation");

//   if (cityValidation){
//     //   console.log("inside if")
//     let cityData = cityValidation.data.map(day => new Forecast(day));
//     console.log(cityData);
//       res.status=200;
//       res.send(cityData);
//   }
//   else{
//     res.status =500;
//     res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);
//   }
// })

// -------------------------------------------------------------------------
// ---------------------------for lab 07 -----------------------------------
// -------------------------------------------------------------------------------









// // localhost:3030/searchCity?lon=2.35&lat=48.86
// server.get('/searchCity', (req, res)=>{
//     let cityLon = req.query.lon;
//     // console.log(`${cityLon} long,`);
//     let cityLat = req.query.lat;
//     // console.log(`${cityLat} lat,`);
// //    console.log(weather);
//      let  cityFound =  weather.find(function(city){
//         //    console.log(cityLon);
//         //   console.log("find", city);
//           return (city.lon == cityLon && city.lat == cityLat);
       

//      });
//     //    console.log("getting city from find",cityFound);
//     if ( cityFound){
//         res.status=200;
//         res.send(cityFound.city_name);
//     }
//     else {
//         res.status =500;
//         res.send("ERROR NOT FOUND");
//     }

   
// })