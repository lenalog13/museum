import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Showcases from "./Pages/Showcases";
import Shelves from "./Pages/Shelves";
import Exhibits from "./Pages/Exhibits";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibition/:id" element={<Showcases />} />
        <Route path="/exhibition/showcase/:id" element={<Shelves />} />
        <Route path="/exhibition/showcase/exhibit/:id" element={<Exhibits />} />
      </Routes>
    </>
  );
}

export default App;
