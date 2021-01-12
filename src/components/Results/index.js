import React from 'react';
import Movie from '../../Movie';

const Results = ({ movies, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }

  if(movies === ''){
    return <h2>Not Found</h2>
  }

  return (
    <ul className='list-group mb-4'>
      {movies.map((movie, i) => (
        <Movie
            key={i}
            title={movie.Title}
            image={movie.Poster}
            year={movie.Year}
            imdb={movie.imdbID}
        />))}
    </ul>
  )
}

export default Results;