import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Authorization from "./Pages/Authorization";
import Setting from "./Pages/Setting";
import Home from "./Pages/Home";
import Rooms from './Pages/Rooms';
import Showcases from "./Pages/Showcases";
import Shelves from "./Pages/Shelves";
import Exhibits from "./Pages/Exhibits";
import ExhibitInfo from "./Pages/ExhibitInfo";


function App() {

  const location = useLocation();

  return (
    <>
      {location.pathname !== '/authorization' && (
        <Navbar />
      )}
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/" element={<Home />} />
        <Route path="/exhibition/:id" element={<Rooms />} />
        <Route path="/exhibition/room/:id" element={<Showcases />} />
        <Route path="/exhibition/room/showcase/:id" element={<Shelves />} />
        <Route path="/exhibition/room/showcase/shelf/:id" element={<Exhibits />} />
        <Route path="/exhibition/room/showcase/shelf/exhibit/:id" element={<ExhibitInfo />} />
      </Routes>
    </>
  );
}

export default App;
