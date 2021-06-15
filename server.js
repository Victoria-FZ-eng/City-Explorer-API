const express = require('express');
const server = express();

const weather = require('./data/weather.json');

const cors = require('cors');
server.use(cors()); 


const PORT = 3111;

// localhost:3111/test
// server.get('/test',(req, res)=>{
//   res.send('hello');
// })

// localhost:3111/weatherData
server.get('/weatherData', (req, res)=>{
    res.send(weather);
})

// localhost:3111/lon-lat
server.get('/lon-lat', (req, res)=>{
    let dataArr =[weather.lon, weather.lat]; 
    res.send(dataArr);
})

// localhost:3111/searchCity?lon=151.21&lat=-33.87
server.get('/searchCity', (req, res)=>{
    let cityLon = req.query.lon;
    let cityLat = req.query.lat;
    let findCity =()=>{
    if(weather.lon === cityLon && weather.lat === cityLat){
        res.send(findCity.city_name);
      } 
    else  {
        res.status(500);
        res.send("ERROR:NOT FOUND");
     }
    }
    
})

server.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT} o.O`);
})


