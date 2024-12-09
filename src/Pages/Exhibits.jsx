import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';

export default function Exhibits() {

  function getExhibitionId() {
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    
    if (parts.length < 3) {
      return null; 
    }
    
    const exhibitionIdStr = parts[2];
    const exhibitionId = parseInt(exhibitionIdStr, 10);
    
    if (isNaN(exhibitionId)) {
      return null; 
    }
    
    return exhibitionId;
  }

  const exhibitionId = getExhibitionId();

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
      title: 'Экспонаты',
      exhibits: [  
          { id: '0', exhibitsName: 'экспонат 1' },
          { id: '1', exhibitsName: 'экспонат 2' },
          { id: '2', exhibitsName: 'экспонат 3' }
      ]
  });

  const exhibits = [
    { id: '3', title: 'экспонат 4', description: [] }, 
    { id: '4', title: 'экспонат 5', description: [] }, 
    { id: '5', title: 'экспонат 6', description: [] }, 
    { id: '6', title: 'экспонат 7', description: [] }, 
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const [newExhibits, setNewExhibits] = useState({
      id: '',
      exhibitsName: '',
      description: []
  });

  const [editingExhibitsId, setEditingExhibitsId] = useState(null);

  const [filteredExhibits, setFilteredExhibits] = useState([]);

  const [inputValue, setInputValue] = useState(null);

  const [error, setError] = useState(false);

  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewExhibits({
          ...newExhibits,
          [name]: value
      });
  };

  const handleAddExhibits = () => {
      if (error) {
            return;
      }  
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

  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteExhibits = (id) => {
    setCatalog(prevCatalog => ({
      ...prevCatalog,
      exhibits: prevCatalog.exhibits.filter(exhibit => exhibit.id !== id)
    }));
    resetForm();
  };

  const resetForm = () => {
      setNewExhibits({ id: '', exhibitsName: '', description: []});
      setEditingExhibitsId(null);
      setModalVisible(false);
      setError(false);
  };

  const handleInputChangeId = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setNewExhibits(prev => ({ ...prev, id: value }));

    const exhibitExists = exhibits.some(exhibit => exhibit.id === value);
    if (!exhibitExists && value !== '') {
        setError(true);
    } else {
        setError(false);
    }
    
    const filtered = exhibits.filter(exhibit => exhibit.id.includes(value));
    setFilteredExhibits(filtered);
  };

  const handleSelectExhibit = (exhibit) => {
    setInputValue(exhibit.id);
    setNewExhibits({
      id: exhibit.id,
      exhibitsName: exhibit.title || '', 
      description: exhibit.description || [], 
    });
    setFilteredExhibits([]);
    setError(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setFilteredExhibits([]);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

return (
    <div>
        <Header title={catalog.title} />
        {userRights !== 'user' && (
            <div className="pages-buttons">
                <button className="adding-button" onClick={() => setModalVisible(true)}>
                    Добавить экспонат
                </button> 
                <Link className="discription" to={`/exhibition/${exhibitionId}/room/showcase/shelf/description`}>
                <button className="adding-button">
                    Редактировать описание полки
                </button> 
                </Link>
            </div>
        )}
        <div className='classList'>
          <ul>
            {catalog.exhibits.length > 0 ? (
            catalog.exhibits.map((item) => (
              <li key={item.id} className="list-item">
                <Link to={`/exhibition/${exhibitionId}/room/showcase/shelf/exhibit/${item.id}`}>
                  {item.exhibitsName}
                </Link>
                { userRights !== 'user' && (
                  <div className='exhibition-buttons'>
                  <button className="setting-button" onClick={() => {
                    if (window.confirm('Вы действительно хотите удалить экспонат?')) {
                      handleDeleteExhibits(item.id);
                    }
                  }}>
                    Удалить
                  </button>
                  </div>
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
                    <h3>{editingExhibitsId !== null ? 'Редактировать экспонат' : 'Добавить экспонат'}</h3>
                    <div className="dropdown" ref={dropdownRef}>
                        <input
                            type="text"
                            name="id"
                            placeholder="номер по книге поступления"
                            value={newExhibits.id}
                            onChange={handleInputChangeId}
                            onFocus={() => setFilteredExhibits(exhibits)}
                            className={error ? 'input-error' : ''}
                        />
                        {error && <div className="error-message-id">Нет экспоната с таким номером по книге поступления</div>}
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
                      <div className="modal-buttons">
                          {editingExhibitsId !== null && (
                              <button className="delete-button" onClick={handleDeleteExhibits}>
                                  Удалить
                              </button>
                          )}
                          <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                          <button className="save-button" onClick={handleAddExhibits}>
                            {editingExhibitsId !== null ? 'Сохранить' : 'Добавить'}
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}