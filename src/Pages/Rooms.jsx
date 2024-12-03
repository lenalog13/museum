import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';
import Room from '../services/Room';

export default function Rooms() {
  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Помещения',
    description: [],
    rooms: [],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomsName: '', description: [] });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const handlePopState = (event) => {
      if (modalVisible && creating) {
        setCreating(false);
        window.history.replaceState({}, '');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [modalVisible, creating]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: value,
    });
  };

  
  const handleCrRoom = () => {
    setCreating(false);
    window.history.replaceState({}, '');
    handleShowModal();
  };


  const handleAddRoom = () => {
    if (editingRoomId !== null) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
        rooms: prevCatalog.rooms.map(room =>
          room.id === editingRoomId ? { ...room, ...newRoom } : room
        ),
      }));
    } else {
      const newId = catalog.rooms.length;
      const roomName = newRoom.roomsName.trim() !== '' ? newRoom.roomsName : `помещение ${newId + 1}`;
      setCatalog({
        ...catalog,
        rooms: [...catalog.rooms, { id: newId, roomsName: roomName, description: [] }],
      });
    }
    resetForm();
  };

  const handleEditRoom = (room) => {
    setNewRoom(room);
    setEditingRoomId(room.id);
    setModalVisible(true);
    window.history.replaceState({}, '');
  };

  const handleCancel = () => {
    resetForm();
    window.history.replaceState({}, '');
  };

  const handleCancelCreate = () => {
    setCreating(false);
    window.history.replaceState({}, '');
    handleShowModal();
  };

  const handleDeleteRoom = () => {
    if (window.confirm('Вы действительно хотите удалить помещение?')) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
        rooms: prevCatalog.rooms.filter(room => room.id !== editingRoomId),
      }));
      resetForm();
    }
  };

  const resetForm = () => {
    setNewRoom({ roomsName: '' });
    setEditingRoomId(null);
    setModalVisible(false);
    setCreating(false);
    window.history.replaceState({}, '');
  };

  const handleShowModal = async () => {
    try {
      const roomsData = await Room.getRooms();
      console.log(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setModalVisible(true);
    setCreating(false);
    window.history.replaceState({}, '');
  };

  const handleCreateRoom = () => {
    setCreating(true);
    window.history.replaceState({ creating: true }, '');
  };

  return (
    <div>
      <Header title={catalog.title} />
      {userRights !== 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={handleShowModal}>
            Добавить помещение
          </button>
          <button className="adding-button">
            Редактировать описание выставки
          </button>
        </div>
      )}
      <div className="classList">
        <ul>
          {catalog.rooms.map(item => (
            <li key={item.id} className="list-item">
              <Link to={`/exhibition/room/${item.id}`}>
                {item.roomsName}
              </Link>
              {userRights !== 'user' && (
                <button className="setting-button" onClick={() => handleEditRoom(item)}>
                  Изменить
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              {editingRoomId !== null
                ? 'Редактирование помещения'
                : creating
                  ? 'Создание помещения'
                  : 'Добавление помещения'}
            </h3>
            {editingRoomId !== null ? (
              <input
                type="text"
                name="roomsName"
                placeholder="Название"
                value={newRoom.roomsName || `помещение ${catalog.rooms.length + 1}`}
                onChange={handleInputChange}
              />
            ) : (creating ? (
              <input
                type="text"
                name="roomsName"
                placeholder="Номер комнаты"
                onChange={handleInputChange}
              />
            ) : (
              <div>
                <div className="rights-container">
                  <select
                    name="rights"
                    onChange={handleInputChange}
                    id="rights"
                  >
                    <option value="moderator">Помещение 1</option>
                    <option value="admin">Помещение 2</option>
                  </select>
                </div>
                <button className="cancel-button" onClick={handleCreateRoom} style={{ marginBottom: '10px' }}>
                  Создать помещение
                </button>
              </div>
            ))}
            <div className="modal-buttons">
              {editingRoomId !== null && (
                <button className="delete-button" onClick={handleDeleteRoom}>
                  Удалить
                </button>
              )}
              {creating ? (
                <button className="cancel-button" onClick={handleCancelCreate}>
                Отменить
              </button>
              ) : (
                <button className="cancel-button" onClick={handleCancel}>
                Отменить
              </button>
              )}
              {creating ? (
                <button className="save-button" onClick={handleCrRoom}>
                  Создать
                </button>
              ) : (
                <button className="save-button" onClick={handleAddRoom}>
                  {editingRoomId !== null ? 'Сохранить' : 'Добавить'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}