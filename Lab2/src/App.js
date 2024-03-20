// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Charts from './pages/Charts.js';
import Navbar from './pages/Navbar.js';

function App() {
  return (
    <Charts />
  );
}

export default App;