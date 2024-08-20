import React from 'react';
import styles from './Home.module.css';
import moviesImage from '../../img/movies.png';
import weatherImage from '../../img/weather.png';
import bookmarkImage from '../../img/bookmark.png';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to My Projects</h1>
                <div className={styles.cardContainer}>
                    <Link to="/movies" className={styles.card}>
                        <img src={moviesImage} alt="Movies App Screenshot" className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h2>Movies App</h2>
                            <p>Search and explore movies using The Movie Database API.</p>
                            <Link to="/movies" className={styles.exploreButton}>View Project</Link>
                        </div>
                    </Link>
                    <Link to="/weather" className={styles.card}>
                        <img src={weatherImage} alt="Weather App Screenshot" className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h2>Weather App</h2>
                            <p>Get real-time weather updates for any location.</p>
                            <Link to="/weather" className={styles.exploreButton}>View Project</Link>
                        </div>
                    </Link>
                    <Link to="/bookmark" className={styles.card}>
                        <img src={bookmarkImage} alt="Bookmark Manager Screenshot" className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h2>Bookmark Manager</h2>
                            <p>Manage your bookmarks effortlessly with this simple and effective bookmark manager.</p>
                            <Link to="/Bookmark" className={styles.exploreButton}>View Project</Link>
                        </div>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Homepage;
