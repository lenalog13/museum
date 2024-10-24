import React from 'react';
import './Authorization.css';
import BackgroundImage from '../Images/plase of poineers.jpg';

function Authorization() {
  return (
    <div className="authorization">
      <div className="left-side">
        <img src={BackgroundImage} alt="Background" />
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Вход</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Войти</button>
          </form>
          {/* Ссылка "Назад" теперь находится под формой */}
          <a href="/previous-page" className="back-link">Назад</a>
        </div>
      </div>
    </div>
  );
}

export default Authorization;


