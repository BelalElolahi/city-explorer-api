
//model 
class Movie {
    constructor(title,overview,averageVotes,totalVotes,posterPath,popularity,releasedOn){
         this.title=title,
         this.overview=overview,
         this.averageVotes = averageVotes,
         this.totalVotes= totalVotes,
         this.posterPath = posterPath,
         this.popularity= popularity,
         this.releasedOn = releasedOn

    }
}

module.exports=Movie;
