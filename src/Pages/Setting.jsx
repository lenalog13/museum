import React, { useState, useEffect } from 'react';
import User from '../services/User';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';

export default function Setting() {
    const [catalog, setCatalog] = useState({ title: 'Пользователи', users: [] });
    const [modalVisible, setModalVisible] = useState(false);
    const [newUser, setNewUser] = useState({ lastName: '', firstName: '', patronymic: '', rights: 'moderator', login: '', password: '' });
    const [editingUserId, setEditingUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
      try {
          const response = await User.getUsers();
          console.log(response);
  
          const users = response.data.map(user => {
              const roleMatch = user.role.match(/=(.*?)\)/);
              const role = roleMatch && roleMatch[1] ? roleMatch[1].trim() : '';
  
              return {
                  id: user.id,
                  lastName: user.last_name,
                  firstName: user.name,
                  patronymic: user.middle_name,
                  rights: role,
                  login: '',
                  password: ''
              };
          });
  
          setCatalog(prevCatalog => ({ ...prevCatalog, users }));
      } catch (error) {
          console.error('Failed to fetch users:', error);
      } finally {
          setLoading(false);
      }
  };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleAddUser = async () => {
        const userData = {
            username: newUser.login,
            secret: newUser.password,
            name: newUser.firstName,
            middleName: newUser.patronymic,
            lastName: newUser.lastName,
            role: newUser.rights.toUpperCase()
        };

        try {
            await User.createUser(userData);
            fetchUsers();
        } catch (error) {
            console.error('Failed to create user:', error);
        }
        resetForm();
    };

    const handleEditUser = (user) => {
        setNewUser({
            lastName: user.lastName,
            firstName: user.firstName,
            patronymic: user.patronymic,
            rights: user.rights,
            login: user.login || '',
            password: user.password || ''
        });
        setEditingUserId(user.id);
        setModalVisible(true);
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleDeleteUser = () => {
        if (window.confirm('Вы действительно хотите удалить пользователя?')) {
            setCatalog(prevCatalog => ({
                ...prevCatalog,
                users: prevCatalog.users.filter(user => user.id !== editingUserId)
            }));
            resetForm();
        }
    };

    const resetForm = () => {
        setNewUser({ lastName: '', firstName: '', patronymic: '', rights: 'moderator', login: '', password: '' });
        setEditingUserId(null);
        setModalVisible(false);
    };

    return (
        <div>
            <Header title={catalog.title} />
            <div className="pages-buttons">
                <button className="adding-button" onClick={() => setModalVisible(true)}> Добавить пользователя </button>
            </div>
            <div className='classList'>
                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <ul>
                        {catalog.users.map((item) => (
                            <li key={item.id} className="list-item">
                                <div>
                                    {item.lastName} {item.firstName} {item.patronymic || ''} - {item.rights}
                                </div>
                                <button className="setting-button" onClick={() => handleEditUser(item)}> Изменить </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingUserId !== null ? 'Редактировать пользователя' : 'Добавить пользователя'}</h3>
                        <input type="text" name="lastName" placeholder="Фамилия" value={newUser.lastName} onChange={handleInputChange} />
                        <input type="text" name="firstName" placeholder="Имя" value={newUser.firstName} onChange={handleInputChange} />
                        <input type="text" name="patronymic" placeholder="Отчество" value={newUser.patronymic} onChange={handleInputChange} />
                        <div className="rights-container">
                            <select name="rights" value={newUser.rights} onChange={handleInputChange} id="rights">
                                <option value="moderator">Модератор</option>
                                <option value="admin">Админ</option>
                            </select>
                        </div>
                        {editingUserId == null ? (
                          <>
                            <input type="text" name="login" placeholder="Логин" value={newUser.login} onChange={handleInputChange} />
                            <input type="password" name="password" placeholder="Пароль" value={newUser.password} onChange={handleInputChange} />
                          </>
                        ) : ("")}
                        
                        <div className="modal-buttons">
                            {editingUserId !== null && (
                                <button className="delete-button" onClick={handleDeleteUser}> Удалить </button>
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