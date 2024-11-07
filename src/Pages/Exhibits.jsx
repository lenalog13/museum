import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';
export default function Exhibits() {
  const userRights = 'admin'; // Права пользователя
  const [catalog, setCatalog] = useState({
      title: 'Экспонаты',
      description: 'Тут описание конкретно этой полки',
      exhibits: [  
          { id: '0', exhibitsName: 'экспонат 1' },
          { id: '1', exhibitsName: 'экспонат 2' },
          { id: '2', exhibitsName: 'экспонат 3' }
      ]
  });

  const exhibits = [{ id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }];

  const [modalVisible, setModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [newExhibits, setNewExhibits] = useState({
      id: '',
      exhibitsName: '',
      description: '',
      file: ''
  });

  const [shelvesDescription, setShelvesDescription] = useState(catalog.description);
  const [editingExhibitsId, setEditingExhibitsId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [filteredExhibits, setFilteredExhibits] = useState([]);
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewExhibits({
          ...newExhibits,
          [name]: value
      });
  };
  const handleAddExhibits = () => {
      if (editingExhibitsId !== null) {
          setCatalog(prevCatalog => ({
              ...prevCatalog,
              exhibits: prevCatalog.exhibits.map(exhibit =>
                  exhibit.id === editingExhibitsId ? { ...exhibit, ...newExhibits } : exhibit
              )
          }));
      } else {
          setCatalog(prevCatalog => ({
              ...prevCatalog,
              exhibits: [...prevCatalog.exhibits, { id: newExhibits.id, ...newExhibits }]
          }));
      }
      resetForm();
  };
  const handleEditExhibits = (exhibit) => {
      setNewExhibits(exhibit);
      setEditingExhibitsId(exhibit.id);
      setModalVisible(true);
  };
  const handleEditShelvesDescription = () => {
      setShelvesDescription(catalog.description);
      setDescriptionModalVisible(true);
  };
  const handleSaveDescription = () => {
      setCatalog(prevCatalog => ({
          ...prevCatalog,
          description: shelvesDescription
      }));
      setDescriptionModalVisible(false);
  };
  const handleCancelDescription = () => {
      setDescriptionModalVisible(false);
  };
  const handleCancel = () => {
      resetForm();
  };
  const handleDeleteExhibits = () => {
      if (window.confirm('Вы действительно хотите удалить экспонат?')) {
          setCatalog(prevCatalog => ({
              ...prevCatalog,
              exhibits: prevCatalog.exhibits.filter(exhibit => exhibit.id !== editingExhibitsId)
          }));
          resetForm();
      }
  };
  const resetForm = () => {
      setNewExhibits({ id: '', exhibitsName: '', description: '', file: '' });
      setEditingExhibitsId(null);
      setModalVisible(false);
      setFilteredExhibits([]); // Сбросить фильтрацию
  };
  const handleInputChangeId = (event) => {
      const value = event.target.value;
      setInputValue(value);
      setNewExhibits(prev => ({ ...prev, id: value })); // Обновляем id в newExhibits
      const filtered = exhibits.filter(exhibit =>
        exhibit.id.includes(value)
    );
    setFilteredExhibits(filtered);
};
const handleSelectExhibit = (exhibit) => {
    setInputValue(exhibit.id);
    setNewExhibits(prev => ({ ...prev, id: exhibit.id })); // Устанавливаем id в newExhibits
    setFilteredExhibits([]);
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
        <Header 
            title={catalog.title} 
            count={catalog.exhibits.length} 
        />
        {userRights !== 'user' && (
            <div className="pages-buttons">
                <button className="adding-button" onClick={() => setModalVisible(true)}>
                    Добавить экспонат
                </button> 
                <button className="adding-button" onClick={handleEditShelvesDescription}>
                    Редактировать описание полки
                </button> 
            </div>
        )}
        <div className='classList'>{formatText(catalog.description)}</div>
        <div className='classList'>
            <ul>
                {catalog.exhibits.map((item) => (
                    <li key={item.id} className="list-item">
                        <Link to={`/exhibition/showcase/shelf/exhibit/${item.id}`}>
                            {item.exhibitsName}
                        </Link>
                        {userRights !== 'user' && (
                            <button className="setting-button" onClick={() => handleEditExhibits(item)}>
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
                    <h3>{editingExhibitsId !== null ? 'Редактировать экспонат' : 'Добавить экспонат'}</h3>
                    <div className="dropdown">
                        <input
                            type="text"
                            name="id"
                            placeholder="номер по книге поступления"
                            value={newExhibits.id} // Здесь отображаем id из newExhibits
                            onChange={handleInputChangeId}
                            onFocus={() => setFilteredExhibits(exhibits)} // Показываем выпадающий список при фокусе
                        />
                        {filteredExhibits.length > 0 && (
                            <ul>
                                {filteredExhibits.map(exhibit => (
                                    <li key={exhibit.id} onClick={() => handleSelectExhibit(exhibit)}>
                                        {exhibit.id}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <input
                        type="text"
                        name="exhibitsName"
                        placeholder="Название"
                        value={newExhibits.exhibitsName}
                        onChange={handleInputChange}
                    />
                    <label>Описание:</label>                  
                     <textarea
                          name="description"
                          placeholder="Описание"
                          value={newExhibits.description}
                          onChange={handleInputChange}
                          className="large-textarea" 
                      />
                      <div className="modal-buttons">
                          {editingExhibitsId !== null && (
                              <button className="delete-button" onClick={handleDeleteExhibits}>
                                  Удалить
                              </button>
                          )}
                          <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                          <button className="save-button" onClick={handleAddExhibits}>Сохранить</button>
                      </div>
                  </div>
              </div>
          )}
          {descriptionModalVisible && ( 
              <div className="modal-overlay">
                  <div className="modal">
                      <h3>Редактировать описание полки</h3>
                      <textarea
                          name="exhibitionDescription"
                          value={shelvesDescription}
                          onChange={(e) => setShelvesDescription(e.target.value)}
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