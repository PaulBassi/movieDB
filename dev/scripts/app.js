import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// app.baseURL = 'https://api.themoviedb.org/3';
// app.apiKey = 'c46c55f29f4061c8020736981b14a86e';




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
      showResults: false
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMovies = this.getMovies.bind(this);
    // this.getCredits = this.getCredits.bind(this);
    // console.log(yourMovieImage);
    
  }

  // componentDidMount() {
    
  //   axios({
  //     url: `https://api.themoviedb.org/3/movie/latest`,
  //     params: {
  //       api_key: `c46c55f29f4061c8020736981b14a86e`,
  //       language: `en-US`,
  //       include_adult: `false`,
     
  //     }
  //   })
  //     .then((data) => {
  //       console.log(data)
  //       this.setState({
  //         movies: data.results
  //       });
  //     });
  // } 



  handleChange(e) {
    // console.log(e.target.value);
    console.log(this.state.search);
    
    this.setState({
      search : e.target.value
    }) 
  }




  
  getMovies(e) {
    e.preventDefault();

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        // api_key: `c46c55f29f4061c8020736981b14a86e`,
        api_key: this.state.apiKey,
        query: this.state.search,
        include_adult: `false`,
      }
    })

      .then((data) => {
        const returnedData = data.data.results;
        const limitedData = returnedData[0];
        
        this.setState({
          yourMovie : limitedData,
          id : limitedData.id,
          showResults: true
        });
        
        console.log(data);
        // console.log(returnedData);
        
        // console.log(limitedData);
        // console.log(limitedData.id);

        return axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}/credits`, {
            params: {
              api_key: this.state.apiKey,
              movie_id: this.state.id,
            }
          })
          
          .then((creditData) => {
            console.log(creditData);
            const returnedCast = creditData.data.cast;
            
            // console.log(returnedCast);

            const limitedCast = returnedCast.slice(0, 4);
            console.log(limitedCast);
            


            this.setState({
              cast: limitedCast
              
            });
            
            

            
            
          });
        
        
      });
  }


 

    render() {
      return (
        <div className="resultContainer" style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          url("https://image.tmdb.org/t/p/original/${this.state.yourMovie.backdrop_path}")`
          }}>

          
          <form action="" onSubmit={this.getMovies}>
            {/* last item in value is set = to name */}
            <input type="text" name="search" onChange={this.handleChange} placeholder="Search Movie" value={this.state.search} />
            <input type="submit" />
          </form>

          {this.state.showResults === true ? (
          <div className="searchResults">
            {/* <div className="resultsTop"> */}

              <div className="resultImage">
                <img src={`https://image.tmdb.org/t/p/w500/${this.state.yourMovie.poster_path}`} alt=""/>
              </div>

              <div className="movieDetails">
                <div className="titleBlurb">
                  <p className="movieTitle">{this.state.yourMovie.title}</p>
                  <p>{this.state.yourMovie.overview}</p>
                </div>
            


                <div className="cast">
                {this.state.cast.map((actor, i) => {
                  return(
                    <div key={i}className="actorProfile">
                      <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="" />
                      <h4>{actor.name}</h4>
                      <h5>{actor.character}</h5>
                    </div>
                  )
                })}

                </div>

              </div>



          
          </div>

          ) : null}

       
          
        </div>

        
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
