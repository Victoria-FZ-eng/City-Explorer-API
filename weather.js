'use strict';
const { default: axios } = require('axios');
const weather = require('./data/weather.json');
// const axios = require('axios');

const weatherFunctions={};


class Forecast{
    constructor(city){
        this.date= city.valid_date,
        this.description= city.weather.description
    }
  }

weatherFunctions.weatherData=(req, res)=>{
    res.send(weather);
  }
  
weatherFunctions.weatherLonLat=(req, res)=>{
    let dataArr =weather.map((city)=> {
      return [`longitude: ${city.lon}` , `latitude: ${city.lat}`];
 }) 
  res.send(dataArr);  
}
  
weatherFunctions.weatherCityLonLat= async (req,res)=>{
    let cityName = req.query.cityName;
    console.log(`weather: ${cityName} kjhkhkjhkjhkjhkjhkh`)
   let weatherKey= process.env.WEATHER_API_KEY;
   let weatherURL= `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherKey}`;
   // console.log("blah");
   console.log(weatherURL);
 try{
   let data =await axios.get(weatherURL);
   // console.log(`${data.data.data[0].pres} here the first one`);
   let receivedData = data.data;
   console.log(receivedData.data);
  //  res.status=200;
   res.status(200).send(`City: ${receivedData.city_name}  -  Longitude: ${receivedData.lon}  -  Latitude: ${receivedData.lat}`);
 }
 catch{
   res.status =500;
   res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);

 }
}

weatherFunctions.weatherForcast=async (req, res)=>{
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
}






module.exports = weatherFunctions;