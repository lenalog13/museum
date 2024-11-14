import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Authorization from "./Pages/Authorization";
import Setting from "./Pages/Setting";
import Home from "./Pages/Home";
import Rooms from './Pages/Rooms';
import Racks from './Pages/Racks';
import WarehouseShelves from './Pages/WarehouseShelves';
import WarehouseExhibits from './Pages/WarehouseExhibits';
import WarehouseExhibitInfo from "./Pages/WarehouseExhibitInfo";
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
        <Route path="/warehouse/room" element={<Rooms />} />
        <Route path="/warehouse/room/:id" element={<Racks />} />
        <Route path="/warehouse/room/rack/:id" element={<WarehouseShelves />} />
        <Route path="/warehouse/room/rack/shelf/:id" element={<WarehouseExhibits />} />
        <Route path="/warehouse/room/rack/shelf/exhibit/:id" element={<WarehouseExhibitInfo />} />
        <Route path="/" element={<Home />} />
        <Route path="/exhibition/:id" element={<Showcases />} />
        <Route path="/exhibition/showcase/:id" element={<Shelves />} />
        <Route path="/exhibition/showcase/shelf/:id" element={<Exhibits />} />
        <Route path="/exhibition/showcase/shelf/exhibit/:id" element={<ExhibitInfo />} />
      </Routes>
    </>
  );
}

export default App;
