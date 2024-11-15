import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css'
import Header from '../Components/Header'; 

export default function WarehouseShelves() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Полки',
    shelves: [
      { id: 0, shelvesName: 'полка 1' },
      { id: 1, shelvesName: 'полка 2' },
      { id: 2, shelvesName: 'полка 3' }
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newShelves, setNewShelves] = useState({
    shelvesName: '',
  });

  const [editingShelvesId, setEditingShelvesId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewShelves ({
          ...newShelves,
          [name]: value
      });
  };

  const handleAddShelves  = () => {
    if (editingShelvesId !== null) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
          shelves: prevCatalog.shelves.map(shelves =>
          shelves.id === editingShelvesId ? { ...shelves, ...newShelves } : shelves
        )
      }));
    } else {
      const newId = catalog.shelves.length;
      setCatalog({
        ...catalog,
        shelves: [...catalog.shelves, { id: newId, ...newShelves }]
      });
    }
    resetForm();
  };

  const handleEditShelves = (shelves) => {
      setNewShelves (shelves);
      setEditingShelvesId(shelves.id);
      setModalVisible(true);
  };

  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteShelves  = () => {
    if (window.confirm('Вы действительно хотите удалить полку?')) {
        setCatalog(prevCatalog => ({
            ...prevCatalog,
            shelves: prevCatalog.shelves.filter(shelves => shelves.id !== editingShelvesId)
        }));
        resetForm();
    }
  };

  const resetForm = () => {
      setNewShelves ({ shelvesName: '' });
      setEditingShelvesId(null);
      setModalVisible(false);
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.shelves.length} />
            { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить полку
          </button> 
        </div>
      )}
      <div className='classList'>
        <ul>
          {catalog.shelves.map((item) => (
            <li key={item.id} className="list-item">
              <Link to={`/warehouse/room/rack/shelf/${item.id}`}>
                {item.shelvesName}
              </Link>
              { userRights !== 'user' && (
                <button className="setting-button" onClick={() => handleEditShelves(item)} >
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
          <h3>{editingShelvesId !== null ?
            'Редактировать помещение' : 'Добавить помещение'}
          </h3>
          <input
            type="text"
            name="shelvesName"
            placeholder="Название"
            value={newShelves.shelvesName}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            {editingShelvesId !== null && (
                    <button className="delete-button" onClick={handleDeleteShelves}>
                        Удалить
                    </button>
            )}
            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
            <button className="save-button" onClick={handleAddShelves}>
              {editingShelvesId !== null ?
              'Сохранить' : 'Добавить'}
            </button>
          </div>
         </div>
         </div>
      )}

    </div>
  );
}