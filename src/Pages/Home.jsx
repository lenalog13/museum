import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Home() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Выставки',
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1', description: [], startData: '2024-01-01', finishData: '2024-12-31' },
      { id: 1, exhibitionName: 'выставка 2' },
      { id: 2, exhibitionName: 'выставка 3' },
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newExhibition, setNewExhibition] = useState({
      exhibitionName: '',
      description: [],
      startData: '',
      finishData: ''
  });

  const [editingExhibitionId, setEditingExhibitionId] = useState(null);

  const [dateError, setDateError] = useState('');

  const [datesEntered, setDatesEntered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
        setNewExhibition ({
        ...newExhibition,
        [name]: value
    });
    if (name === 'startData' || name === 'finishData') {
      setDatesEntered(true);
    }
  };

  const validateDates = () => {
    const { startData, finishData } = newExhibition;
    if (new Date(startData) > new Date(finishData)) {
      setDateError('Дата окончания должна быть позже даты начала.');
      return false;
    }
    setDateError('');
    return true;
  };

  const handleAddExhibition  = () => {
    if (!validateDates()) return;
    if (editingExhibitionId !== null) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
        exhibition: prevCatalog.exhibition.map(exhibition =>
          exhibition.id === editingExhibitionId ? { ...exhibition, ...newExhibition } : exhibition
        )
      }));
    } else {
      const newId = catalog.exhibition.length;
      setCatalog({
        ...catalog,
        exhibition: [...catalog.exhibition, { id: newId, ...newExhibition }]
      });
    }
    resetForm();

  };

  const handleEditExhibition  = (exhibition) => {
    setNewExhibition({
        exhibitionName: exhibition.exhibitionName || '',
        description: exhibition.description || [],
        startData: exhibition.startData || '',
        finishData: exhibition.finishData || ''
    });
    setEditingExhibitionId(exhibition.id);
    setModalVisible(true);
};


  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteExhibition  = () => {
    if (window.confirm('Вы действительно хотите удалить выставку?')) {
        setCatalog(prevCatalog => ({
            ...prevCatalog,
            exhibition: prevCatalog.exhibition.filter(exhibition => exhibition.id !== editingExhibitionId)
        }));
        resetForm();
    }
  };


  const resetForm = () => {
    setNewExhibition({ exhibitionName: '', description: [], startData: '', finishData: '' });
    setEditingExhibitionId(null);
    setModalVisible(false);
    setDateError('');
    setDatesEntered(false);
  };
  
  return (
    <div>
      <Header title={catalog.title}/>

      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить выставку
          </button> 
        </div>
      )}

      <div className='classList'>
        <ul>
        {catalog.exhibition.length > 0 ? (
            catalog.exhibition.map((item) => (
              <li key={item.id} className="list-item">
                <Link to={`/exhibition/${item.id}`}>
                  {item.exhibitionName}
                </Link>
                { userRights !== 'user' && (
                  <button className="setting-button" onClick={() => handleEditExhibition(item)} >
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
                    <h3>{editingExhibitionId !== null ?
                     'Редактировать выставку' : 'Создать выставку'}
                    </h3>
                    <input
                        type="text"
                        name="exhibitionName"
                        placeholder="Название"
                        value={newExhibition.exhibitionName}
                        onChange={handleInputChange}
                    />
                    <label>Дата начала:</label>
                    <input
                      type="date"
                      name="startData"
                      value={newExhibition.startData}
                      onChange={handleInputChange}
                      className={datesEntered && dateError ? 'input-error' : ''}
                    />
                    <label>Дата окончания:</label>
                    <input
                      type="date"
                      name="finishData"
                      value={newExhibition.finishData}
                      onChange={handleInputChange}
                      className={datesEntered && dateError ? 'input-error' : ''}
                    />
                    {dateError && <div className="error-message-data">{dateError}</div>}
                    <div className="modal-buttons">
                        {editingExhibitionId !== null && (
                                <button className="delete-button" onClick={handleDeleteExhibition}>
                                    Удалить
                                </button>
                        )}
                        <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                        <button className="save-button" onClick={handleAddExhibition}>
                        {editingExhibitionId !== null ?
                        'Сохранить' : 'Создать'}
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}


