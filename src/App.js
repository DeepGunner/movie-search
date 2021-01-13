import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import Results from './components/Results';
import Pagination from './components/Pagination';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function App() {
	const [moviesList, setMoviesList] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [found, setFound] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(4);
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
      <header>
			<form
        id='form'
				action='submit'
				className="search-wrapper cf"
				onSubmit={e => onSubmitHandler(e)}
			>
				<input
          type="text"
          id="search"
					type='text'
					className='search'
					value={search}
					onChange={onSearchHandler}
					placeholder='Search a movie here'
				/>
				<button className='search-button'><FontAwesomeIcon icon={faSearch} /></button>
			</form>
      </header>
      <main id='main'>
			{!found || moviesList === [] ? <NotFound /> : ''}

      		<Results movies={currentPosts} loading={loading} />
      </main>
      <Pagination
        		postsPerPage={postsPerPage}
        		totalPosts={moviesList ? moviesList.length : 0}
        		paginate={paginate}
      		/>
		</div>
	);
}

export default App;