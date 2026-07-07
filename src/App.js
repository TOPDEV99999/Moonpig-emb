import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import CardListing from './components/cards/CardListings';
import Navbar from './components/common/Navbar';
import Home from './components/Home';
import CardDetails from './components/cards/CardDetails';

// Images
import spinner from './images/spinner.gif';
import logo from './images/00029c0952c47339167ed0f19cd566a5.png';

console.log(spinner);
console.log(logo);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar logo={logo} />
        <Routes>
          <Route path="/" element={<Home spinner={spinner} />} />
          <Route path="/cards" element={<CardListing spinner={spinner} />} />
          <Route path="/cards/:MoonpigProductNo" element={<CardDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
