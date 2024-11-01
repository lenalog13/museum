import React from 'react';
import './Authorization.css';
import BackgroundImage from '../Images/plase of poineers.svg';

function Authorization({ setUser  }) {


  return (
    <div className="authorization">
      <div className="left-side">
        <img src={BackgroundImage} alt="Background" />
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Вход</h2>
          <form onSubmit>
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input/>
            </div>
            <button class="login-button">Войти</button>
          </form>
          <a href="/" className="back-link">Назад</a>
        </div>
      </div>
    </div>
  );
}

export default Authorization;


