// url-weather: https://api.weatherbit.io/v2.0/forecast/daily
// url-movies: https://api.themoviedb.org/3/search/movie

'use strict';
const express = require('express');
const server = express();


const cors = require('cors');
server.use(cors()); 

const wthr = require('./weather.js');

const mv = require('./movie.js')

// localhost:3050
const PORT = process.env.PORT || 3050;
require("dotenv").config();


// localhost:3050/
server.get('/',home);

// localhost:3050/test
server.get('/test',test);

// localhost:3050/weatherData
server.get('/weatherData', wthr.weatherData);

// localhost:3050/lon-lat
server.get('/lon-lat', wthr.weatherLonLat);

// localhost:3050/movies?location=germany
server.get('/movies',mv);

// localhost:3050/searchCity?cityName=amman
server.get('/searchCity', wthr.weatherCityLonLat);

// localhost:3050/cityData?cityName=paris
server.get('/cityData', wthr.weatherForcast);

function home(req, res){
  res.send('Home...');
}

function test(req, res){
  res.send('hello');
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