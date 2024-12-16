import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AllCountries from './pages/AllCountries';
import CountryDetail from './pages/CountryDetail';
import Navbar from './components/Navbar';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <Routes>
        <Route path='/' element={<AllCountries/>} />
        <Route path='/country/:name' element={<CountryDetail/>} />
        <Route path='*' element={<h1>Page not found 404</h1>} />
      </Routes>
    </Router>
  )
}