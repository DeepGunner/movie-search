import React from 'react';
import Movie from '../../Movie';
import '../../App.css'


const Results = ({ movies, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }

  if(movies === ''){
    return <h2></h2>
  }

  return (
    <>
      {movies.map((movie, i) => (
        <Movie
            key={i}
            title={movie.Title}
            image={movie.Poster}
            year={movie.Year}
            imdb={movie.imdbID}
        />))}
  </>
  )
}

export default Results;