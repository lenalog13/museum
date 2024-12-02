import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';
import Exhibition from '../services/Exhibition'; 

export default function Home() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Выставки',
    exhibition: []
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDeleteExhibition  = async (id) => {
    if (window.confirm('Вы действительно хотите удалить выставку?')) {
        try {
            
            console.log(await Exhibition.deleteExhibition(id))
            setCatalog(prevCatalog => ({
                ...prevCatalog,
                exhibition: prevCatalog.exhibition.filter(exhibition => exhibition.id !== id)
            }));
            resetForm();
        } catch (error) {
            console.error('Error deleting exhibition:', error);
            setError(error);
        }
    }
  };


  const resetForm = () => {
    setNewExhibition({ exhibitionName: '', description: [], startData: '', finishData: '' });
    setEditingExhibitionId(null);
    setModalVisible(false);
    setDateError('');
    setDatesEntered(false);
  };

  const fetchExhibition = async () => {
    try {
      const response = await Exhibition.getExhibition();
      const exhibitions = response.data.map(exhibition => ({
        id: exhibition.id,
        exhibitionName: exhibition.name,
        description: exhibition.description || [],
        startData: exhibition.dateFrom,
        finishData: exhibition.dateTo
      }));
      setCatalog({
        ...catalog,
        exhibition: exhibitions
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibition();
  }, []);
  
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
                { userRights !== 'user' && (
                  <button className="delete-button" onClick={() => handleDeleteExhibition(item.id)} >
                    Удалить
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
                                <button className="delete-button" onClick={() => handleDeleteExhibition(editingExhibitionId)}>
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