import React, { useEffect, useState } from 'react';
import styles from './Movies.module.css';
import Spinner from '../Spinner/Spinner';

const API_KEY = '2560e7b5b5481b751e759d97bba29fe0';
const TRENDING_API_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
const MOVIE_DETAILS_API_URL = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
const MOVIE_RECOMMENDATIONS_API_URL = (id) => `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`;

function Movies() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingMovies();
    }, []);

    const fetchTrendingMovies = () => {
        setLoading(true);
        fetch(TRENDING_API_URL)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching trending movies:', error);
                setLoading(false);
            });
    };

    const fetchMoviesBySearch = (query) => {
        const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        fetch(SEARCH_API_URL)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => console.error('Error fetching search results:', error));
    };

    const showMovieDetails = (movieId) => {
        fetch(MOVIE_DETAILS_API_URL(movieId))
            .then(response => response.json())
            .then(movie => {
                setSelectedMovie(movie);
                fetchRecommendedMovies(movieId);
            })
            .catch(error => console.error('Error fetching movie details:', error));
    };

    const fetchRecommendedMovies = (movieId) => {
        fetch(MOVIE_RECOMMENDATIONS_API_URL(movieId))
            .then(response => response.json())
            .then(data => {
                if (selectedMovie) {
                    setSelectedMovie({ ...selectedMovie, recommendations: data.results });
                }
            })
            .catch(error => console.error('Error fetching recommended movies:', error));
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div>
            <header className={styles.header}>
                <h1>Browse Your Favorite Movies!</h1>
                <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Search Movies..." 
                    onChange={(e) => {
                        const query = e.target.value.trim();
                        if (query) {
                            fetchMoviesBySearch(query);
                        } else {
                            fetchTrendingMovies();
                        }
                    }}
                    className={styles.input}
                />
            </header>
            <div id="movie-container" className={styles.movieContainer}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.movieCard}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <button 
                            className={styles.detailsButton}
                            onClick={() => showMovieDetails(movie.id)}
                        >
                            View Details
                        </button>
                        <div className={styles.movieInfo}>
                            <h2>{movie.title}</h2>
                            <p>Rating: {movie.vote_average}</p>
                            <p>{movie.release_date ? `Release Date: ${movie.release_date}` : ''}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMovie && (
                <div id="modal" className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                        <div className={styles.modalDetails}>
                            <h2>{selectedMovie.title}</h2>
                            <p>{selectedMovie.overview}</p>
                            <p>Rating: {selectedMovie.vote_average}</p>
                            <p>Release Date: {selectedMovie.release_date}</p>
                        </div>

                        {selectedMovie.recommendations && (
                            <div className={styles.recommendations}>
                                <h3>Recommended Movies</h3>
                                {selectedMovie.recommendations.map((movie) => (
                                    <div key={movie.id} className={styles.movieCard}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        <div className={styles.movieInfo}>
                                            <h2>{movie.title}</h2>
                                            <p>Rating: {movie.vote_average}</p>
                                            <p>{movie.release_date ? `Release Date: ${movie.release_date}` : ''}</p>
                                            <button 
                                                className={styles.detailsButton}
                                                onClick={() => showMovieDetails(movie.id)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movies;
