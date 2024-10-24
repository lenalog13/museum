import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Вы точно хотите выйти?");
    if (confirmLogout) {
      onLogout(); // Вызываем функцию выхода, если пользователь подтвердил
    }
  };

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
          {user ? (
            <li 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              {user}
              {isDropdownVisible && (
                <div className="dropdown-menu">
                  <p onClick={handleLogout}>Выйти</p> {/* Изменено на handleLogout */}
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link to="/authorization">Войти</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}


