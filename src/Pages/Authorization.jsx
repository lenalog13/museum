import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authorization.css';
import BackgroundImage from '../Images/plase of poineers.svg';
import { Context } from '..';

function Authorization() {
  const { store } = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    const success = await store.login(username, password);
    if (success) {
      navigate('/');
    } else {
      alert('Неверные логин или пароль');
    }
  };

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
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="login-button" onClick={handleLoginClick}>
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authorization;