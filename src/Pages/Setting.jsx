import React from 'react';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Setting() {

  const catalog = {
    title: 'Пользователи',
    users: [
      { id: 0, name: 'Чернышов А.В.', rights: 'admin', login: 'sacha', password: '12345' },
      { id: 1, name: 'Модератор1', rights: 'moderator', login: 'moderator1', password: 'moderator1' },
      { id: 2, name: 'Модератор2', rights: 'moderator', login: 'moderator2', password: 'moderator2' },
    ]
  };


  return (
    <div>
      <Header title={catalog.title} 
        count={null} />
      <div className='classList'>
        <button className="adding-button">
            Добавить пользователя
        </button>
        </div>
      <div className='classList'>
        <ul>
        {catalog.users.map((item) => (
            <li key={item.id} className="list-item">
              <div>
                {item.name} - {item.rights}
              </div>
              <button className="setting-button">
                Изменить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}