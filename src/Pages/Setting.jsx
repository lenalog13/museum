import React, { useState } from 'react';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Setting() {

  const [catalog, setCatalog] = useState({
    title: 'Пользователи',
    users: [
      { id: 0, name: 'Чернышов А.В.', rights: 'admin', login: 'sacha', password: '12345' },
      { id: 1, name: 'Модератор 1', rights: 'moderator', login: 'moderator1', password: 'moderator1' },
      { id: 2, name: 'Модератор 2', rights: 'moderator', login: 'moderator2', password: 'moderator2' },
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newUser , setNewUser ] = useState({
      name: '',
      rights: 'moderator',
      login: '',
      password: ''
  });

  const [editingUserId, setEditingUserId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser ({
          ...newUser ,
          [name]: value
      });
  };

  const handleAddUser  = () => {
      if (editingUserId !== null) {
          setCatalog(prevCatalog => ({
              ...prevCatalog,
              users: prevCatalog.users.map(user =>
                  user.id === editingUserId ? { ...user, ...newUser  } : user
              )
          }));
      } else {
          const newId = catalog.users.length;
          setCatalog({
              ...catalog,
              users: [...catalog.users, { id: newId, ...newUser  }]
          });
      }
      resetForm();
  };

  const handleEditUser  = (user) => {
      setNewUser (user);
      setEditingUserId(user.id);
      setModalVisible(true);
  };

  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteUser  = () => {
    if (window.confirm('Вы действительно хотите удалить пользователя?')) {
        setCatalog(prevCatalog => ({
            ...prevCatalog,
            users: prevCatalog.users.filter(user => user.id !== editingUserId)
        }));
        resetForm();
    }
  };


  const resetForm = () => {
      setNewUser ({ name: '', rights: 'moderator', login: '', password: '' }); 
      setEditingUserId(null);
      setModalVisible(false);
  };

  

  return (
    <div>
      <Header title={catalog.title} 
        count={null} />

      <div className="pages-buttons">
        <button className="adding-button" onClick={() => setModalVisible(true)}>
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
              <button className="setting-button" onClick={() => handleEditUser (item)}f >
                Изменить
              </button>
            </li>
          ))}
        </ul>
      </div>

      {modalVisible && (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>{editingUserId !== null ?
                     'Редактировать пользователя' : 'Добавить пользователя'}
                    </h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={newUser.name}
                        onChange={handleInputChange}
                    />
                    <div className="rights-container">
                        <select name="rights" value={newUser.rights} onChange={handleInputChange} id="rights">
                            <option value="moderator">Модератор</option>
                            <option value="admin">Админ</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        name="login"
                        placeholder="Логин"
                        value={newUser.login}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={newUser.password}
                        onChange={handleInputChange}
                    />
                    <div className="modal-buttons">
                        {editingUserId !== null && (
                                <button className="delete-button" onClick={handleDeleteUser}>
                                    Удалить
                                </button>
                        )}
                        <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                        <button className="save-button" onClick={handleAddUser}>
                            {editingUserId !== null ? 'Сохранить' : 'Добавить'}
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}
