//https://api.themoviedb.org/3/movie/550?api_key=9f9227e64e881a71065d51b8d1bf6f3b
class movie {
    constructor(id, name, genre, releaseDate, rating, length,
                description, posterPath, backdropPath){
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.length = length;
        this.description = description;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.greet = function(){
            console.log("salut");
        }
    }
}
module.exports = movie;
