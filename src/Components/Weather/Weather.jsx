import React, { useState } from 'react';
import styles from './Weather.module.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  const fetchWeather = () => {
    const apiKey = '50be74a1e49e42a682f94847243007';
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setWeatherData(data);
        } else {
          alert('Location not found');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="../../src/img/logo@2x.png" alt="Weather Logo" />
          <h1>Weather</h1>
        </div>
        <nav>
          <ul className={styles.navLinks}>
            <li><a onClick={() => window.location.href = '/'}>Home</a></li>
            <li><a onClick={() => window.location.href = '/news'}>News</a></li>
            <li><a onClick={() => window.location.href = '/live-cameras'}>Live Cameras</a></li>
            <li><a onClick={() => window.location.href = '/photos'}>Photos</a></li>
            <li><a onClick={() => window.location.href = '/contact'}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className={styles.searchSection}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Find your location..."
          />
          <button onClick={fetchWeather}>Find</button>
        </section>
        <section className={styles.weatherDisplay}>
          {weatherData && (
            <>
              <div className={`${styles.weatherCard} ${styles.today}`}>
                <h2>Today</h2>
                <p>{weatherData.location.name}</p>
                <p>{weatherData.current.temp_c}°C</p>
                <p>{weatherData.current.condition.text}</p>
                <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                <p>Rain: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                <p>Wind: {weatherData.current.wind_kph} kph {weatherData.current.wind_dir}</p>
              </div>

              <div className={`${styles.weatherCard} ${styles.tomorrow}`}>
                <h2>Tomorrow</h2>
                <p>High: {weatherData.forecast.forecastday[1].day.maxtemp_c}°C</p>
                <p>Low: {weatherData.forecast.forecastday[1].day.mintemp_c}°C</p>
                <p>{weatherData.forecast.forecastday[1].day.condition.text}</p>
                <img src={weatherData.forecast.forecastday[1].day.condition.icon} alt={weatherData.forecast.forecastday[1].day.condition.text} />
              </div>

              <div className={`${styles.weatherCard} ${styles.dayAfterTomorrow}`}>
                <h2>Day After Tomorrow</h2>
                <p>High: {weatherData.forecast.forecastday[2].day.maxtemp_c}°C</p>
                <p>Low: {weatherData.forecast.forecastday[2].day.mintemp_c}°C</p>
                <p>{weatherData.forecast.forecastday[2].day.condition.text}</p>
                <img src={weatherData.forecast.forecastday[2].day.condition.icon} alt={weatherData.forecast.forecastday[2].day.condition.text} />
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Weather;
