import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {

  const[userRights, setUserRights] = useState('admin');

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
          <li> { userRights != 'user' && (
            <Link to="/warehouse/room">Фонды</Link>
          )}
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
        <li> { userRights == 'admin' && (
            <Link to="/setting">Настройка</Link>
          )}
          </li>
        {userRights === 'user' ? (
            <li>
              <Link to="/authorization">Войти</Link>
            </li>
          ) : (
            <li>
              <Link to="/">
                <button class="logout-button" onClick={() => setUserRights('user')}>Выйти</button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}


