import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Context } from '..';

export default function Navbar() {

  const { store } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Музей истории <br /> детского движения</h2>
        <p>Вспоминая прошлое, создаем будущее</p>
      </div>
  
      <div className="navbar-left">
        <ul className="navbar-links">
          <li>
            <Link to="/">Выставки</Link>
          </li>
          {<li> { localStorage.getItem('role')? (
            <Link to="/qr">Сформировать <br/> qr-коды</Link>
          ):("")}
          </li>}
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">

          <li> { localStorage.getItem('role') == 'ADMIN' && (
            <Link to="/setting">Настройка</Link>
          )}
          </li>

          <li> { localStorage.getItem('role') == 'ADMIN' && (
            <Link to="/backup">Резервная копия</Link>
          )}
          </li>

          <li> { localStorage.getItem('role') ? (
            <Link className="logout-link" to="/authorization">Выйти</Link>
          ):(
            <Link className="logout-link" to="/authorization">Войти</Link>
          )}
          </li>

          
        </ul>
      </div>
    </nav>
  );
}


