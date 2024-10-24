import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

  const [user, setUser ] = useState(null); // Состояние для хранения пользователя

  const handleLogin = (username) => {
    setUser (username); // Устанавливаем пользователя при входе
  };

  const handleLogout = () => {
    setUser (null) // Сбрасываем состояние пользователя при выходе
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/authorization" element={<Authorization setUser ={setUser}/>} />
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
