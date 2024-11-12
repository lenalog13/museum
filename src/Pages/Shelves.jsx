import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import './List.css';
import './Setting.css'
import Header from '../Components/Header'; 

export default function Shelves() {

    const userRights = 'admin';

    const [catalog, setCatalog] = useState({
      title: 'Полки',
      description: ' Тут описание конкретно этой витрины',
      shelves: [  
        { id: 0, shelvesName: 'полка 1' },
        { id: 1, shelvesName: 'полка 2' },
        { id: 2, shelvesName: 'полка 3' } ]
    });
  
    const [modalVisible, setModalVisible] = useState(false);
  
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  
    const [newShelves, setNewShelves] = useState({
        shelvesName: '',
        description: ''
    });
  
    const [showcasesDescription, setShowcasesDescription] = useState(catalog.description);
  
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
  
    const handleEditShelves  = (shelves) => {
        setNewShelves (shelves);
        setEditingShelvesId(shelves.id);
        setModalVisible(true);
    };
  
    const handleEditShowcasesDescription = () => {
      setShowcasesDescription(catalog.description);
      setDescriptionModalVisible(true);
    };
  
    const handleSaveDescription = () => {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
        description: showcasesDescription
      }));
      setDescriptionModalVisible(false);
    };
  
    const handleCancelDescription = () => {
      setDescriptionModalVisible(false);
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
        setNewShelves ({ shelvesName: '', description: '' });
        setEditingShelvesId(null);
        setModalVisible(false);
    };

      const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
              {line.trim()}
              <br />
          </span>
        ));
      };

  return (
    <div>
      { <Header 
        title={catalog.title} 
        count = {catalog.shelves.length} /> }

      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить полку
          </button> 
          <button className="adding-button" onClick={handleEditShowcasesDescription}>
            Редактировать описание витрины
          </button> 
        </div>
      )}

    <div className='classList'>{formatText(catalog.description)}</div>
    <div className='classList'>
      <ul>
        {catalog.shelves.length > 0 ? (
            catalog.shelves.map((item) => (
              <li key={item.id} className="list-item">
                <Link to={`/exhibition/showcase/shelf/${item.id}`}>
                  {item.shelvesName}
                </Link>
                { userRights !== 'user' && (
                  <button className="setting-button" onClick={() => handleEditShelves(item)} >
                    Изменить
                  </button>
                )}
              </li>
            ))
          ) : (
            <li className="list-item"> Тут пока ничего нет 🙁</li>
          )}
      </ul>
    </div>

    {modalVisible && (

    <div className="modal-overlay">
      <div className="modal">
        <h3>{editingShelvesId !== null ?
          'Редактировать полку' : 'Добавить полку'}
        </h3>
      <input
        type="text"
        name="shelvesName"
        placeholder="Название"
        value={newShelves.shelvesName}
        onChange={handleInputChange}
       />
      <label>Описание:</label>
      <textarea
        name="description"
        value={newShelves.description}
        onChange={handleInputChange}
        className="large-textarea" 
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
          'Схранить' : 'Добавить'}
        </button>
     </div>
    </div>
    </div>
    )}

    {descriptionModalVisible && ( 
    <div className="modal-overlay">
      <div className="modal">
        <h3>Редактировать описание витрины</h3>
        <textarea
         name="exhibitionDescription"
         value={showcasesDescription}
         onChange={(e) => setShowcasesDescription(e.target.value)}
         className="large-textarea" 
        />
       <div className="modal-buttons">
         <button className="cancel-button" onClick={handleCancelDescription}>Отменить</button>
         <button className="save-button" onClick={handleSaveDescription}>Сохранить</button>
       </div>
     </div>
    </div>
    )}
  </div>
  );
}