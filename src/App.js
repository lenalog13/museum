import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Authorization from "./Pages/Authorization";
import Home from "./Pages/Home";
import Racks from './Pages/Racks';
import WarehouseShelves from './Pages/WarehouseShelves';
import Boxes from './Pages/Boxes';
import WarehouseExhibits from './Pages/WarehouseExhibits';
import Showcases from "./Pages/Showcases";
import Shelves from "./Pages/Shelves";
import Exhibits from "./Pages/Exhibits";
import ExhibitInfo from "./Pages/ExhibitInfo";


function App() {

  const location = useLocation(); // Получаем текущий путь

  return (
    <>
      {location.pathname !== '/authorization' && (
        <Navbar />
      )}
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/warehouse" element={<Racks />} />
        <Route path="/warehouse/rack/:id" element={<WarehouseShelves />} />
        <Route path="/warehouse/rack/shelf/:id" element={<Boxes />} />
        <Route path="/warehouse/rack/shelf/box/:id" element={<WarehouseExhibits />} />
        <Route path="/warehouse/rack/shelf/box/exhibit/:id" element={<ExhibitInfo />} />
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
