import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
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
          <li>
          <Link to="/warehouse">Склад</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
          <Link to="/authorization">Войти</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

