getMovies(e) {
    e.preventDefault();
    console.log('working');
    
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        // api_key: `c46c55f29f4061c8020736981b14a86e`,
        api_key: this.state.apiKey,
        // language: `en-US`,
        query: `nemo`,
        // sort_by: `popularity.desc`,
        // include_adult: `false`,
        // include_video: `false`,
        // page: `1`,
        // primary_release_year: `2016`

      }
    })
    
      .then((data) => {
        this.setState({movies: data.results});
        console.log(data);
        
      });
    }