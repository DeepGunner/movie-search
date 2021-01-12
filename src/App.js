import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import Results from './components/Results';
import Pagination from './components/Pagination';


function App() {
	const [moviesList, setMoviesList] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [found, setFound] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(5);
	const [query, setQuery] = useState('');
	const API_KEY = "beb3e254";

	const getSearchedMovies = async () => {
		setLoading(true);
		const response = await fetch(
			`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
		);
		const data = await response.json();
		setMoviesList(data.Search);
		setLoading(false);
		if (data.Search) {
			setFound(true);
		} else {
			setFound(false);
		}
	};
	const onSearchHandler = e => {
		e.preventDefault();
		setSearch(e.target.value);
		setQuery(e.target.value);
	};
	
	const onSubmitHandler = event => {
		event.preventDefault();
		getSearchedMovies();
		setCurrentPage(1);
		console.log(search);
	};

	// Get current posts
	const indexOfLastPost = moviesList ? currentPage * postsPerPage : '';
	const indexOfFirstPost = moviesList ? indexOfLastPost - postsPerPage : '';
	console.log(moviesList);
	const currentPosts = moviesList ? moviesList.slice(indexOfFirstPost, indexOfLastPost) : '';
  
	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);
	return (
		<div className='App'>
			<form
				action='submit'
				className='search-form'
				onSubmit={e => onSubmitHandler(e)}
			>
				<input
					type='text'
					className='search-movie'
					value={search}
					onChange={onSearchHandler}
					placeholder='Search a movie here'
				/>
				<button className='search-button'>Search</button>
			</form>
			<div className='Container'>
			{!found || moviesList === [] ? <NotFound /> : ''}
			<div className='container mt-5'>

      		<Results movies={currentPosts} loading={loading} />
      		<Pagination
        		postsPerPage={postsPerPage}
        		totalPosts={moviesList ? moviesList.length : 0}
        		paginate={paginate}
      		/>
    		</div>
			</div>
		</div>
	);
}

export default App;
