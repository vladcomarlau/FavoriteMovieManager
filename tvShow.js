var movie = require('./movie.js');
class tvShow extends movie{
    constructor(id, name, genre, releaseDate, rating, length,
                description, posterPath, backdropPath, 
                lastAirDate, seasons, totalEpisodes){
        super(id, name, genre, releaseDate, rating, length,
            description, posterPath, backdropPath);
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.length = length;
        this.description = description;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.lastAirDate = lastAirDate;
        this.seasons = seasons;
        this.totalEpisodes = totalEpisodes;
        this.greet = function(){
            console.log("salut");
        }
    }
}
module.exports = tvShow;