const axios = require('axios');

let ramMemoryMovie= {};


class Movies {
    constructor(film){
      this.poster = film.poster_path,
      this.name = film.original_title,
      this.description = film.overview,
      this.date = film.release_date,
      this.pop = film.popularity
    }
  }
const mv = function movies (req, res){
    let location = req.query.location;
    
    
    if(ramMemoryMovie[location] !== undefined) {
       res.send(ramMemoryMovie[location]);
       console.log("inside if");
    }
    else {
      let movieKey= process.env.MOVIE_API_KEY;
    let movieURL= `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${location}`;
        console.log("inside else");
    axios
      .get(movieURL).then(movies=>{
        
        const moviesObjects = movies.data.results.map(obj=> new Movies (obj));
        
        if( moviesObjects.length != 0){
        res.send(moviesObjects);
        // console.log(moviesObjects);
      }
        else{
            res.status(500).send(`${err}: MOVIE'S DATA NOT FOUND FOR REQUIRED LOCATION`);
            console.log("not valid");
        }  
      })
      .catch(err => {
        res.status(500).send(`${err}: MOVIE'S DATA NOT FOUND FOR REQUIRED LOCATION`);
        console.log("catch");
    })
    }
    
  };

  module.exports = mv;