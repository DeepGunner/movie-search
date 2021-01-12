import React from 'react';

const movie = ({ title, image, year, imdb}) => {
	return (
		<div onClick={() => window.open(`https://www.imdb.com/title/${imdb}/`)} className='movie-card'>
			<h1 className='movie-title'>{title}</h1>
			<img src={image} alt='' className='movie-poster' />
			<h3 className='movie-year'>{year}</h3>
		</div>
	);
};

export default movie;
