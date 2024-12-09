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
            const users = response.data.map(user => ({
                id: user.id,
                lastName: user.lastName,
                firstName: user.name,
                patronymic: user.middleName,
                login: '',
                password: '',
                role: extractRole(user.role)
            }));
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

    const handleUpdateUser = async () => {
        const userData = {
            userId: editingUserId,
            name: newUser.firstName,
            middleName: newUser.patronymic,
            lastName: newUser.lastName,
            role: newUser.rights.toUpperCase()
        };

        try {
            await User.updateUser(userData);
            fetchUsers();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
        resetForm();
    };

    const handleEditUser = async (user) => {
        try {
            const response = await User.getUserById(user.id);
            const fetchedUser = response.data;
            //console.log(extractRole(fetchedUser.role))
            setNewUser({
                lastName: fetchedUser.lastName,
                firstName: fetchedUser.name,
                patronymic: fetchedUser.middleName,
                rights: extractRole(fetchedUser.role)
            });
            setEditingUserId(user.id);
            setModalVisible(true);
        } catch (error) {
            console.error('Failed to fetch user by ID:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Вы действительно хотите удалить пользователя?')) {
            try {
                await User.deleteUser(userId); 
                fetchUsers();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };

    const handleCancel = () => {
        resetForm();
    };

    const resetForm = () => {
        setNewUser({ lastName: '', firstName: '', patronymic: '', login: '', password: '', rights: 'moderator' });
        setEditingUserId(null);
        setModalVisible(false);
    };

    // Функция для извлечения роли из строки
    const extractRole = (roleString) => {
        const match = roleString.match(/role=([^)]+)/);
        return match ? match[1] : '';
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
                            <li key={item.id} className="list-item" style={{ display: 'flex' }}>
                                <div className="text-container" style={{ flex: 1 }}>
                                    {item.lastName} {item.firstName} {item.patronymic || ''}
                                </div>
                                <div className="button-container" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                {item.id !== 1 ? (
                                    <button className="setting-button" onClick={() => handleDeleteUser(item.id)}>
                                        Удалить
                                    </button>
                                    ) : null}
                                    <button className="setting-button" onClick={() => handleEditUser(item)}>Изменить</button>
                                </div>
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
                                <option value="MODERATOR">Модератор</option>
                                <option value="ADMIN">Админ</option>
                            </select>
                        </div>
                        {editingUserId == null ? (
                            <>
                                <input type="text" name="login" placeholder="Логин" value={newUser.login} onChange={handleInputChange} />
                                <input type="password" name="password" placeholder="Пароль" value={newUser.password} onChange={handleInputChange} />
                            </>
                        ) : (
                            ""
                        )}

                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                            {editingUserId !== null ? (
                                <button className="save-button" onClick={handleUpdateUser}>Сохранить</button>
                            ) : (
                                <button className="save-button" onClick={handleAddUser}>Добавить</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}