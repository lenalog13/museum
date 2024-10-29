import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {

  let userName = 'aaa'
  let userRights = 'admin'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

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
            <Link to="/warehouse">Фонды</Link>
          )}
          </li>
          <li> { userRights == 'admin' && (
            <Link to="/settings">Настройка</Link>
          )}
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="navbar-links">
        {userRights === 'user' ? (
            <li>
              <Link to="/authorization">Войти</Link>
            </li>
          ) : (
            <li 
              onMouseEnter={() => setIsDropdownOpen(true)} // Открытие выпадающего меню при наведении
              onMouseLeave={() => setIsDropdownOpen(false)} // Закрытие выпадающего меню при уходе курсора
            >
              <span>{userName}</span>
              {isDropdownOpen && ( // Условное отображение выпадающего меню
                <div className="dropdown-menu">
                  <p>Выйти</p> 
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}


