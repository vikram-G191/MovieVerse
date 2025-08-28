import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
     <Router> 
      <Header />
      {/* <ThemeToggle /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}
export default App;
