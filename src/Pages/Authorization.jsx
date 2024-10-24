import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authorization.css';
import BackgroundImage from '../Images/plase of poineers.jpg';

function Authorization({ setUser  }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Проверяем логин и пароль
    if (username === 'lena' && password === 'lena') {
      setUser ('Елена'); // Устанавливаем пользователя
      navigate('/'); // Перенаправляем на страницу home
    } else {
      alert('Неверный логин или пароль'); // Сообщение об ошибке
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Обновляем состояние логина
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Обновляем состояние пароля
                required
              />
            </div>
            <button type="submit">Войти</button>
          </form>
          <a href="/" className="back-link">Назад</a>
        </div>
      </div>
    </div>
  );
}

export default Authorization;


