import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Authorization from "./Pages/Authorization";
import Setting from "./Pages/Setting";
import Qr from "./Pages/Qr";
import Home from "./Pages/Home";
import Rooms from './Pages/Rooms';
import Showcases from "./Pages/Showcases";
import Shelves from "./Pages/Shelves";
import Exhibits from "./Pages/Exhibits";
import ExhibitInfo from "./Pages/ExhibitInfo";
import Backup from "./Pages/Backup";


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
        <Route path="/qr" element={<Qr />} />

        <Route path="/" element={<Home />} />
        <Route path="/exhibition/:id" element={<Rooms />} />
        <Route path="/exhibition/:id/description" element={<ExhibitInfo />} />
        <Route path="/exhibition/:id/room/:id" element={<Showcases />} />
        <Route path="/exhibition/:id/room/description" element={<ExhibitInfo />} />
        <Route path="/exhibition/:id/room/exhibit/:id" element={<ExhibitInfo />} />
        <Route path="/exhibition/:id/room/showcase/:id" element={<Shelves />} />
        <Route path="/exhibition/:id/room/showcase/description" element={<ExhibitInfo />} />
        <Route path="/exhibition/:id/room/showcase/shelf/:id" element={<Exhibits />} />
        <Route path="/exhibition/:id/room/showcase/shelf/description" element={<ExhibitInfo />} />
        <Route path="/exhibition/:id/room/showcase/shelf/exhibit/:id" element={<ExhibitInfo />} />
        <Route path="/backup" element={<Backup />} />
      </Routes>
    </>
  );
}

export default App;
