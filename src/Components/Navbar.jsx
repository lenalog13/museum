import React from 'react'
import { Link } from 'react-router-dom';
import './Components/Navbar.css';


export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <h2>Музей истории детского движения</h2>
        </div>
        <ul className="navbar-links">
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Все экспонаты</Link></li>
          <li><Link to="#" onClick={(e) => e.preventDefault()}>Выставки</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="#" onClick={(e) => e.preventDefault()}>Войти</Link>
      </div>
    </nav>
  );
}
