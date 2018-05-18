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
      id: ''
    
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
    console.log(e.target.value);
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
        
        this.setState({yourMovie : limitedData});
        this.setState({id : limitedData.id});
        
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
          });
        
        
      });
  }


 

    render() {
      return (
        <div>
          <form action="" onSubmit={this.getMovies}>
            {/* last item in value is set = to name */}
            <input type="text" name="search" onChange={this.handleChange} placeholder="Search Movie" value={this.state.search} />
            <input type="submit" />
          </form>

          <p>{this.state.id}</p>



          <p>{this.state.yourMovie.title}</p>
          <p>{this.state.yourMovie.overview}</p>


          <img src={`https://image.tmdb.org/t/p/w500/${this.state.yourMovie.poster_path}`} alt=""/>
          <img src={`https://image.tmdb.org/t/p/original/${this.state.yourMovie.backdrop_path}`} alt="" />
          
          
        </div>

        
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
