const express = require('express');
const server = express();

const weather = require('./data/weather.json');

const cors = require('cors');
const { response } = require('express');
server.use(cors()); 


const PORT = process.env.PORT || 3030;
 require("dotenv").config();

// localhost:3030/test
// server.get('/test',(req, res)=>{
//   res.send('hello');
// })

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

// localhost:3030/searchCity?lon=2.35&lat=48.86
server.get('/searchCity', (req, res)=>{
    let cityLon = req.query.lon;
    // console.log(`${cityLon} long,`);
    let cityLat = req.query.lat;
    // console.log(`${cityLat} lat,`);
//    console.log(weather);
     let  cityFound =  weather.find(function(city){
        //    console.log(cityLon);
        //   console.log("find", city);
          return (city.lon == cityLon && city.lat == cityLat);
       

     });
    //    console.log("getting city from find",cityFound);
    if ( cityFound){
        res.status=200;
        res.send(cityFound.city_name);
    }
    else {
        res.status =500;
        res.send("ERROR NOT FOUND");
    }

   
})


// localhost:3030/dated-data
server.get('/dated-data',(req,res)=>{
    let datedDataArr = weather.data;
    res.send(datedDataArr);
    // console.log(datedDataArr);
})

// localhost:3030/forcastEachCity
server.get('/forcastEachCity', (req, res)=>{

    let forcastData = weather.map((city)=>{
        
        return new Forecast (city);
    })
    res.send(forcastData);
    console.log (forcastData);

});



class Forecast{
    constructor(city){
        this.date= city.data.valid_date,
        this.description= city.data.weather.description
    }
}

server.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT} o.O`);
})


