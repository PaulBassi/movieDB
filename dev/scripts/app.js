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
      // movies: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMovies = this.getMovies.bind(this);
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
  
  getMovies(e, query) {
    e.preventDefault();
    console.log('working');

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        // api_key: `c46c55f29f4061c8020736981b14a86e`,
        api_key: this.state.apiKey,
        // language: `en-US`,
        query: this.state.search,
        // sort_by: `popularity.desc`,
        // include_adult: `false`,
        // include_video: `false`,
        // page: `1`,
        // primary_release_year: `2016`

      }
    })

      .then((data) => {
        this.setState({ movies: data.results });
        console.log(data);

      });
  }

 

    render() {
      return (
        <div>
          <p>Hello</p>
          <form action="" onSubmit={this.getMovies}>
            {/* last item in value is set = to name */}
            <input type="text" name="search" onChange={this.handleChange} placeholder="Search Movie" value={this.state.search} />
            <input type="submit" />
          </form>

          {/* <input type="text"/>
          <button onClick={this.getMovies}></button> */}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
