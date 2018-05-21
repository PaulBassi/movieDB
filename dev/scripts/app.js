import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// apiKey : 'c46c55f29f4061c8020736981b14a86e';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      apiKey: 'c46c55f29f4061c8020736981b14a86e',
      movies: [],
      yourMovie: [],
      id: '',
      cast: [],
      movieInfo: [],
      showResults: false
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMovies = this.getMovies.bind(this);    
  }

  
  //Set search = user input
  handleChange(e) {
    // console.log(this.state.search);
    this.setState({
      search : e.target.value
    }) 
  }

  getMovies(e) {
    e.preventDefault();
    //API call for seach movies
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: this.state.apiKey,
        query: this.state.search,
        include_adult: `false`,
      }
    })

      .then((data) => {
        const returnedData = data.data.results;
        //Limit result shown to first item from returnedData
        const limitedData = returnedData[0];
        
        this.setState({
          yourMovie : limitedData,
          id : limitedData.id,
          showResults: true
        });
        
      
        //API call to get movie credit info
        return axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}/credits`, {
            params: {
              api_key: this.state.apiKey,
            }
          })
          
          .then((creditData) => {
            const returnedCast = creditData.data.cast;
            const limitedCast = returnedCast.slice(0, 4);
            
            this.setState({
              cast: limitedCast
            });
            
            //API call to get movie info/stats
            return axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}`, {
              params: {
                api_key: this.state.apiKey,
              }
            })
            
            .then((movieInfo) => {
              const returnedInfo = movieInfo.data;

              this.setState({
                movieInfo: returnedInfo
              });
            })
          });
      });
  }


 

    render() {
      return (
        <div className="resultContainer" style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          url("https://image.tmdb.org/t/p/original/${this.state.yourMovie.backdrop_path}")`
          }}>

          {/* Home Page */}
          {this.state.showResults === false ? (
          <div className="homePage">
            <img src="../../assets/logo2.png" alt="" className="homeLogo" />
            <form action="" onSubmit={this.getMovies} id="homePageForm">
                <input type="text" name="search" id="homeSearch" onChange={this.handleChange} placeholder="Search Movie" value={this.state.search} /><input type="submit" value="Search" id="homeSubmit" />
              </form>
          </div>
          ) : null}
            


          
          {/* Results Page */}
          {this.state.showResults === true ? (
          <div>
            <header>
              <img src="../../assets/logo2.png" alt=""/>
              <form action="" onSubmit={this.getMovies} id="resultPageForm">
                {/* last item in value is set = to name */}
                <input type="text" name="search" id="resultSearch" onChange={this.handleChange} placeholder="Search Movie" value={this.state.search} />
                <input type="submit" value="Search" id="resultSubmit" />
              </form>
            </header>
            <div className="searchResultsContainer">
              <div className="searchResults">

                {/* Movie Poster */}
                <div className="resultImage">
                  <img src={`https://image.tmdb.org/t/p/w500/${this.state.yourMovie.poster_path}`} alt=""/>
                </div>

                {/* Title-Tagline-Overview */}
                <div className="movieDetails">
                  <div className="titleBlurb">
                    <h2 className="movieTitle">{this.state.yourMovie.title}</h2>
                    <h3 className="tagline">{this.state.movieInfo.tagline}</h3>
                    <p>{this.state.yourMovie.overview}</p>
                  </div>

                  {/* Movie Stats */}
                  <div className="movieStats">
                    <div className="rating">
                    <h6>Rating:</h6>
                    <p>{this.state.movieInfo.vote_average} / 10</p>
                    </div>

                    <div className="runtime">
                    <h6>Running Time:</h6>
                    <p>{this.state.movieInfo.runtime} mins</p>
                    </div>

                    <div className="releaseDate">
                    <h6>Release Date:</h6>
                    <p>{this.state.movieInfo.release_date}</p>
                    </div>
                  </div>

                  {/* Cast */}
                  <div className="cast">
                  {this.state.cast.map((actor, i) => {
                    return(
                      <div key={i} className="actorProfile">
                        <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="" />
                        <p className="actorName">{actor.name}</p>
                        <p className="actorCharacter">{actor.character}</p>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div> 
          ) : null}

          {this.state.showResults === false ? (
          <footer>
            <p>Developed by Paul Bassi</p>
            <div className="footerImage">
            <img src="../../assets/moviedb2.png" alt=""/>
            </div>
          </footer>
          ) : null}
          
        </div> 

        
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
