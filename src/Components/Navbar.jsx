import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Музей истории <br /> детского движения</h2>
      </div>
  
      <div className="navbar-left">
        <ul className="navbar-links">
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>Все экспонаты</a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>Выставки</a>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>Войти</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

