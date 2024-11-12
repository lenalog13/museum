import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Showcases() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Витрины',
    description: ' Тут описание конкретно этой выставки ',
    showcases: [
      { id: 0, showcasesName: 'витрина 1' },
      { id: 1, showcasesName: 'витрина 2' },
      { id: 2, showcasesName: 'витрина 3' }
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  const [newShowcases, setNewShowcases] = useState({
      showcasesName: '',
      description: ''
  });

  const [exhibitionDescription, setExhibitionDescription] = useState(catalog.description);

  const [editingShowcasesId, setEditingShowcasesId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewShowcases ({
          ...newShowcases,
          [name]: value
      });
  };

  const handleAddShowcases  = () => {
    if (editingShowcasesId !== null) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
          showcases: prevCatalog.showcases.map(showcases =>
          showcases.id === editingShowcasesId ? { ...showcases, ...newShowcases } : showcases
        )
      }));
    } else {
      const newId = catalog.showcases.length;
      setCatalog({
        ...catalog,
        showcases: [...catalog.showcases, { id: newId, ...newShowcases }]
      });
    }
    resetForm();
  };

  const handleEditShowcases  = (showcases) => {
      setNewShowcases (showcases);
      setEditingShowcasesId(showcases.id);
      setModalVisible(true);
  };

  const handleEditExhibitionDescription = () => {
    setExhibitionDescription(catalog.description);
    setDescriptionModalVisible(true);
  };

  const handleSaveDescription = () => {
    setCatalog(prevCatalog => ({
      ...prevCatalog,
      description: exhibitionDescription
    }));
    setDescriptionModalVisible(false);
  };

  const handleCancelDescription = () => {
    setDescriptionModalVisible(false);
  };

  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteShowcases  = () => {
    if (window.confirm('Вы действительно хотите удалить витрину?')) {
        setCatalog(prevCatalog => ({
            ...prevCatalog,
            showcases: prevCatalog.showcases.filter(showcases => showcases.id !== editingShowcasesId)
        }));
        resetForm();
    }
  };


  const resetForm = () => {
      setNewShowcases ({ showcasesName: '', description: '' });
      setEditingShowcasesId(null);
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
      <Header title={catalog.title} 
        count={catalog.showcases.length} />

      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить витрину
          </button> 
          <button className="adding-button" onClick={handleEditExhibitionDescription}>
            Редактировать описание выставки
          </button> 
        </div>
      )}

      <div className='classList'>{formatText(catalog.description)}</div>
      <div className='classList'>
        <ul>
        {catalog.showcases.length > 0 ? (
            catalog.showcases.map((item) => (
              <li key={item.id} className="list-item">
                <Link to={`/exhibition/showcase/${item.id}`}>
                  {item.showcasesName}
                </Link>
                { userRights !== 'user' && (
                  <button className="setting-button" onClick={() => handleEditShowcases(item)} >
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
          <h3>{editingShowcasesId !== null ?
            'Редактировать витрину' : 'Добавить витрину'}
          </h3>
          <input
            type="text"
            name="showcasesName"
            placeholder="Название"
            value={newShowcases.showcasesName}
            onChange={handleInputChange}
          />
          <label>Описание:</label>
          <textarea
            name="description"
            value={newShowcases.description}
            onChange={handleInputChange}
            className="large-textarea" 
          />
          <div className="modal-buttons">
            {editingShowcasesId !== null && (
                    <button className="delete-button" onClick={handleDeleteShowcases}>
                        Удалить
                    </button>
            )}
            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
            <button className="save-button" onClick={handleAddShowcases}>
              {editingShowcasesId !== null ?
              'Сохранить' : 'Добавить'}
            </button>
          </div>
         </div>
         </div>
      )}

      {descriptionModalVisible && ( 
      <div className="modal-overlay">
        <div className="modal">
          <h3>Редактировать описание выставки</h3>
          <textarea
            name="exhibitionDescription"
            value={exhibitionDescription}
            onChange={(e) => setExhibitionDescription(e.target.value)}
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
