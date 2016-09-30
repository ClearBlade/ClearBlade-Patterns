function fetchMovieData(req, resp){
    // This is an example movie title
    var movieTitle = "Reservoir Dogs";
    
    // You can also pass a movie title into this Code Service. as part of the request
    // As part of the request, pass in a JSON object like this: {movieTitle: "Reservoir Dogs"}
    // then retrieve it with the following line
    // var movieTitle = req.params.movieTitle;
    
    callOmdb(movieTitle)
    
    function callOmdb(title){
        
        // Make an XHR Request to OMDB's API
        var options = {
            uri : "http://www.omdbapi.com/?t="+encodeURIComponent(title)+"&y=&plot=full&r=json"
        };
        
        var requestObject = ClearBlade.http().Request();
        requestObject.get(options,function(err,result){
            
            result = JSON.parse(result)
            
            if(err){
                resp.error("Error encountered making HTTP Request: " + result);
            }
            
            movieIsFound = result.Response == "True" ? true : false
            
            if(! movieIsFound ){
                resp.error("Movie not found in database.")
            }
            
            resp.success(result)
            
        }); 
    }

    /*
    Output:
    
    {
      "Actors": "Harvey Keitel, Tim Roth, Michael Madsen, Chris Penn",
      "Awards": "9 wins & 15 nominations.",
      "Country": "USA",
      "Director": "Quentin Tarantino",
      "Genre": "Crime, Drama, Thriller",
      "Language": "English",
      "Metascore": "78",
      "Plot": "Six criminals, who are strangers to each other, are hired by a crime boss, Joe Cabot, to carry out a diamond robbery. Right at the outset, they are given false names with the intention that they won't get too close and will concentrate on the job instead. They are completely sure that the robbery is going to be a success. But, when the police show up right at the time and the site of the robbery, panic spreads amongst the group members, and two of them are killed in the subsequent shootout, along with a few policemen and civilians. When the remaining people assemble at the premeditated rendezvous point (a warehouse), they begin to suspect that one of them is an undercover cop.",
      "Poster": "http://ia.media-imdb.com/images/M/MV5BNWVhMzQ5MWUtNjZkNC00MGQwLTkzNmEtNjcyZDE2ZWYxNzc2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      "Rated": "R",
      "Released": "02 Sep 1992",
      "Response": "True",
      "Runtime": "99 min",
      "Title": "Reservoir Dogs",
      "Type": "movie",
      "Writer": "Quentin Tarantino, Roger Avary (background radio dialog), Quentin Tarantino (background radio dialog)",
      "Year": "1992",
      "imdbID": "tt0105236",
      "imdbRating": "8.4",
      "imdbVotes": "668,196"
    }
   */
    
    
}

   
