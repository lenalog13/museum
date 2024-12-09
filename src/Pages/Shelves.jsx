import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Shelf from '../services/Shelf';
import Header from '../Components/Header';

import './List.css';
import './Setting.css';

export default function Shelves() {
  const { id } = useParams();
  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Полки',
    description: 'Тут описание конкретно этой витрины',
    shelves: []
  });

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newShelf, setNewShelf] = useState({ number: '', description: '' });
  const [editingShelfId, setEditingShelfId] = useState(null);

  useEffect(() => {
    fetchShelves();
  }, [id]);

  const fetchShelves = () => {
    if (id) {
      setLoading(true);
      Shelf.getShelvesByShelvingId(id)
        .then(data => {
          setCatalog(prevCatalog => ({
            ...prevCatalog,
            shelves: data.data || []
          }));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching shelves:', error);
          setLoading(false);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShelf(prevShelf => ({
      ...prevShelf,
      [name]: value
    }));
  };

  const handleAddShelf = () => {
    console.log(newShelf.number, id)
    const newShelfData = {

      shelfNumber: newShelf.number,
      shelvingId: id,
      description: ""
    };

    Shelf.createShelf(newShelfData)
      .then(response => {
        console.log('Shelf created:', response.data);
        fetchShelves();
        resetForm();
      })
      .catch(error => {
        console.error('Error creating shelf:', error);
      });
  };

  const handleEditShelf = (shelf) => {
    setNewShelf({
      number: shelf.number,
      description: shelf.description || ''
    });
    setEditingShelfId(shelf.id);
    setModalVisible(true);
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleDeleteShelf = (id) => {
    if (window.confirm('Вы действительно хотите удалить полку?')) {
      Shelf.deleteShelf(id)
        .then(() => {
          fetchShelves();
          resetForm();
        })
        .catch(error => {
          console.error('Error deleting shelf:', error);
        });
    }
  };

  const resetForm = () => {
    setNewShelf({ number: '', description: '' });
    setEditingShelfId(null);
    setModalVisible(false);
  };

  return (
    <div>
      <Header title={catalog.title} />
      {userRights !== 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>Добавить полку</button>
          <Link className="discription" to={`/exhibition/${id}/room/showcase/description`}>
            <button className="adding-button">Описание витрины</button>
          </Link>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='classList'>
          <ul>
            {catalog.shelves.length > 0 ? (
              catalog.shelves.map((item) => (
                <li key={item.id} className="list-item">
                  <Link to={`/exhibition/${id}/room/showcase/shelf/${item.id}`}>
                    Полка {item.number}
                  </Link>
                  {userRights !== 'user' && (
                    <button className="setting-button" onClick={()=>handleDeleteShelf(item.id)}>
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
      )}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingShelfId !== null ? 'Редактировать полку' : 'Добавить полку'}</h3>
            <input
              type="text"
              name="number"
              placeholder="Введите номер полки"
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              {editingShelfId !== null && (
                <button className="delete-button" onClick={handleDeleteShelf}>Удалить</button>
              )}
              <button className="cancel-button" onClick={handleCancel}>Отменить</button>
              <button className="save-button" onClick={handleAddShelf}>
                {editingShelfId !== null ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}