import React from 'react';
import './App.css'

const movie = ({ title, image, year, imdb}) => {
	return (
		<div onClick={() => window.open(`https://www.imdb.com/title/${imdb}/`)} className='movie'>
			<img src={image} alt='' className='movie-poster' />
			<h1 className='movie-info'>{title}</h1>
			{/* <h3 className='movie-year'>{year}</h3> */}
		</div>
	);
};

export default movie;
