import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import First from './components/First';
import Register from './components/Register';
import Items from './components/Items';

function App() {
  const [imageTransfer, setImageTransfer] = useState();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home images={imageTransfer}/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Items" element={<Items imageTransfer={setImageTransfer}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
