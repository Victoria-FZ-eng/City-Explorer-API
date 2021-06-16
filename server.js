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

// const movieKey= process.env.MOVIE_API_KEY;

//const movieURL= `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${cityName}`;

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

// -------------------------------- for lab 08 ------------------------------------------
// localhost:3030/searchCity?cityName=amman
server.get('searchCity',async (req,res)=>{
     let weather = req.query.city;
    let weatherKey= process.env.WEATHER_API_KEY;
    let weatherURL= `https://api.weatherbit.io/v2.0/forecast/daily?city=${weather}&key=${weatherKey}`;
    let data = await axiox.get(weatherURL);
    console.log(data.data.city_name);
})

   
    

// function weatherInfo(req, res) {
    

    

//         axios
//             .get(weatherUrl)
//             .then(result => {
//                 const weatherArr = result.data.data.map(item => {
//                      return new Forecast(item);
//                 })
//                 res.send(weatherArr);
//             })
//             .catch(err => {
//                 res.status(500).send(`Not found ${err}`);
//             })
    
// }
// ------------------------------- for lab 08 ---------------------------------------

// ------------------------for lab 07 ----------------------------------
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

// ---------------------------for lab 07 -----------------------------------

// localhost:3030/cityData?cityName=paris
server.get('/cityData', (req, res)=>{
  let cityName = req.query.cityName;
  let cityValidation = weather.find((city)=>{
      return (city.city_name.toLocaleLowerCase() == cityName.toLocaleLowerCase());
  })
//   console.log("cityValidation");

  if (cityValidation){
    //   console.log("inside if")
    let cityData = cityValidation.data.map(day => new Forecast(day));
    console.log(cityData);
      res.status=200;
      res.send(cityData);
  }
  else{
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