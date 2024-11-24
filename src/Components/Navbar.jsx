import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Context } from '..';

export default function Navbar() {

  const { store } = useContext(Context);
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
            <Link to="/qr">Сформировать <br/> qr-коды</Link>
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
              <Link to="/authorization">{store.isAuth? 'Выйти' : 'Войти'}</Link>
            </li>
          ) : (
            <li>
              <Link to="/" onClick={() => setUserRights('user')} className="logout-link">
                Выйти
              </Link>       
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}


