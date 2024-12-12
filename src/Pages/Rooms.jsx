import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';
import Room from '../services/Room';

export default function Rooms() {
    const { id } = useParams();
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
    const [inputValue, setInputValue] = useState('');
    const [roomsData, setRoomsData] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const fetchRooms = async () => {
        try {
            const roomsResponse = await Room.getRooms();
            console.log(roomsResponse)
            setRoomsData(roomsResponse.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchExhibitionRooms = async () => {
        try {
            const roomsData = await Room.getRoomsByExhibitionId(id);
            setCatalog(prevCatalog => ({
                ...prevCatalog,
                rooms: roomsData.data,
            }));
        } catch (error) {
            console.error('Error fetching rooms by exhibition ID:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
        if (id) {
            fetchExhibitionRooms();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleAddRoom = () => {
        if (selectedRoomId !== null && selectedRoomId !== '' && id) {
            Room.addRoomToExhibition(selectedRoomId, id)
                .then(() => {
                    fetchExhibitionRooms();
                    resetForm();
                    setModalVisible(false);
                })
                .catch(error => {
                    console.error('Error adding room to exhibition:', error);
                    alert('Failed to add room to exhibition. Please try again.');
                });
        } else {
            alert('Пожалуйста, выберите номер помещения.');
        }
    };

    const handleEditRoom = (room) => {
        setNewRoom(room);
        setEditingRoomId(room.id);
        setModalVisible(true);
    };

    const handleDeleteRoom = () => {
        if (window.confirm('Вы действительно хотите удалить помещение?')) {
            Room.deleteRoom(id)
            .then(() => {
              fetchRooms();
              resetForm();
            })
            .catch(error => {
              console.error('Error deleting room:', error);
            });
        }
    };

    const resetForm = () => {
        setNewRoom({ roomsName: '' });
        setEditingRoomId(null);
        setCreating(false);
        setInputValue('');
        setSelectedRoomId('');
    };

    const handleCreateRoom = () => {
        setCreating(true);
    };

    const handleShowModal = () => {
        setModalVisible(true);
        setCreating(false);
    };

    const handleCancelCreate = () => {
        setCreating(false);
        handleShowModal();
    };

    const handleCancel = () => {
        resetForm();
        setModalVisible(false);
    };

    const handleCrRoom = () => {
        const roomNumber = inputValue;
        if (!roomNumber) {
            alert('Please provide a room number.');
            return;
        }
        Room.createRoom(roomNumber)
            .then(() => {
                fetchRooms();
                if (id) {
                    fetchExhibitionRooms();
                }
                resetForm();
                handleShowModal();
            })
            .catch(error => {
                console.error('Error creating room:', error);
                alert('Failed to create room. Please try again.');
            });
    };

    const handleSelectRoom = (e) => {
        setSelectedRoomId(e.target.value);
    };

    const handleDelete = (id) => {
        Room.deleteRoom(id)
            .then(response => {
                fetchRooms();
                console.log('Room deleted successfully:', response);
            })
            .catch(error => {
                console.error('Error deleting room:', error);
            });
    };

    return (
        <div>
            <Header title={catalog.title} />
            {userRights !== 'user' && (
                <div className="pages-buttons">
                    <button className="adding-button" onClick={handleShowModal}> Добавить помещение </button>
                    <Link className="discription" to={`/exhibition/${id}/description`}>
                    <button className="adding-button">
                         Описание выставки 
                    </button>
                    </Link>
                </div>
            )}
            <div className="classList">
                <ul>
                    {catalog.rooms.length > 0 ? (
                        catalog.rooms.map(item => (
                            <li key={item.id} className="list-item">
                                <Link to={`/exhibition/${id}/room/${item.id}`}>
                                    Помещение {item.number}
                                </Link>
                                {userRights !== 'user' && (
                                <button className="setting-button" onClick={()=>handleDeleteRoom(item.id)}>
                                    Удалить
                                </button>
                  )}
                            </li>
                        ))
                    ) : (
                        <li className="list-item">Тут пока ничего нет 🙁</li>
                    )}
                </ul>
            </div>
            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingRoomId !== null ? 'Редактирование помещения' : creating ? 'Создание помещения' : 'Добавление помещения'}</h3>
                        {editingRoomId !== null ? (
                            <input type="text" name="roomsName" placeholder="Название" value={newRoom.roomsName || `помещение ${catalog.rooms.length + 1}`} onChange={handleInputChange} />
                        ) : (creating ? (
                            <input type="text" name="roomsName" placeholder="Номер комнаты" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        ) : (
                            <div>
                                <div className="rights-container">
                                    <select name="selectedRoom" onChange={handleSelectRoom} value={selectedRoomId} id="selectedRoom">
                                        <option value="" disabled selected>Выберите помещение</option>
                                        {roomsData.length > 0 ? (
                                            roomsData.map(room => (
                                                <option key={room.id} value={room.id}>
                                                    {room.number}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Тут пока нет комнат</option>
                                        )}
                                    </select>
                                </div>
                                <button className="cancel-button" onClick={handleCreateRoom} style={{ marginBottom: '10px' }}> Создать помещение </button>
                            </div>
                        ))}
                        <div className="modal-buttons">
                            {editingRoomId !== null && (
                                <button className="delete-button" onClick={handleDeleteRoom}> Удалить </button>
                            )}
                            {creating ? (
                                <button className="cancel-button" onClick={handleCancelCreate}> Отменить </button>
                            ) : (
                                <button className="cancel-button" onClick={handleCancel}> Отменить </button>
                            )}
                            {creating ? (
                                <button className="save-button" onClick={handleCrRoom}> Создать </button>
                            ) : (editingRoomId !== null ?(
                              <button className="save-button" > Сохранить </button>
                            ):(
                              <button className="save-button" onClick={handleAddRoom}> Добавить </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}