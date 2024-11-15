import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css'
import Header from '../Components/Header'; 

export default function Rooms() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Помещения',
    rooms: [
      { id: 0, roomsName: 'адрес 1 помещение 1' },
      { id: 1, roomsName: 'адрес 1 помещение  2' },
      { id: 2, roomsName: 'адрес 1 помещение  3' },
      { id: 3, roomsName: 'адрес 2 помещение 1' }
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newRooms, setNewRooms] = useState({
    roomsName: '',
  });

  const [editingRoomsId, setEditingRoomsId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRooms ({
          ...newRooms,
          [name]: value
      });
  };

  const handleAddRooms  = () => {
    if (editingRoomsId !== null) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
          rooms: prevCatalog.rooms.map(rooms =>
          rooms.id === editingRoomsId ? { ...rooms, ...newRooms } : rooms
        )
      }));
    } else {
      const newId = catalog.rooms.length;
      setCatalog({
        ...catalog,
        rooms: [...catalog.rooms, { id: newId, ...newRooms }]
      });
    }
    resetForm();
  };

  const handleEditRooms  = (rooms) => {
      setNewRooms (rooms);
      setEditingRoomsId(rooms.id);
      setModalVisible(true);
  };

  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteRooms  = () => {
    if (window.confirm('Вы действительно хотите удалить помещение?')) {
        setCatalog(prevCatalog => ({
            ...prevCatalog,
            rooms: prevCatalog.rooms.filter(rooms => rooms.id !== editingRoomsId)
        }));
        resetForm();
    }
  };

  const resetForm = () => {
      setNewRooms ({ roomsName: '' });
      setEditingRoomsId(null);
      setModalVisible(false);
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.rooms.length} />
      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить помещение
          </button> 
        </div>
      )}
      <div className='classList'>
        <ul>
          {catalog.rooms.map((item) => (
            <li key={item.id} className="list-item">
              <Link to={`/warehouse/room/${item.id}`}>
                {item.roomsName}
              </Link>
              { userRights !== 'user' && (
                <button className="setting-button" onClick={() => handleEditRooms(item)} >
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
          <h3>{editingRoomsId !== null ?
            'Редактировать помещение' : 'Добавить помещение'}
          </h3>
          <input
            type="text"
            name="roomsName"
            placeholder="Название"
            value={newRooms.roomsName}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            {editingRoomsId !== null && (
                    <button className="delete-button" onClick={handleDeleteRooms}>
                        Удалить
                    </button>
            )}
            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
            <button className="save-button" onClick={handleAddRooms}>
              {editingRoomsId !== null ?
              'Сохранить' : 'Добавить'}
            </button>
          </div>
         </div>
         </div>
      )}

    </div>
  );
}