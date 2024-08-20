import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Weather from './Components/Weather/Weather';
import Bookmark from './Components/Bookmark/Bookmark';
import NavigationBar from './Components/Navbar/Navbar';
import { ThemeProvider, ThemeContext } from './ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
                        <Router>
                            <NavigationBar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/movies" element={<Movies />} />
                                <Route path="/weather" element={<Weather />} />
                                <Route path="/bookmark" element={<Bookmark />} />
                                <Route path="*" element={<div>Page Not Found</div>} />
                            </Routes>
                        </Router>
                    </div>
                )}
            </ThemeContext.Consumer>
        </ThemeProvider>
    );
}

export default App;
