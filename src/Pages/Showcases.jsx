import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Showcases() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Витрины',
    description: [],
    showcases: [
      { id: 0, showcasesName: 'витрина 1', description: [] },
      { id: 1, showcasesName: 'витрина 2', description: [] },
      { id: 2, showcasesName: 'витрина 3', description: [] }
    ],
    exhibits: [
      { id: 0, exhibitsName: 'экспонат 1', description: [] },
      { id: 1, exhibitsName: 'экспонат 2', description: [] },
      { id: 2, exhibitsName: 'экспонат 3', description: [] }
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newShowcases, setNewShowcases] = useState({
      showcasesName: '',
      description: []
  });

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
      const showcasName = newShowcases.showcasesName.trim() === '' ? `витрина ${newId + 1}` : newShowcases.showcasesName
      setCatalog({
        ...catalog,
        showcases: [...catalog.showcases, { id: newId, showcasesName: showcasName, description: [] }]
      });
    }
    resetForm();
  };

  const handleEditShowcases  = (showcases) => {
      setNewShowcases (showcases);
      setEditingShowcasesId(showcases.id);
      setModalVisible(true);
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
      setNewShowcases ({ showcasesName: '', description: [] });
      setEditingShowcasesId(null);
      setModalVisible(false);
  };

  return (
    <div>
      <Header title={catalog.title} />

      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить витрину
          </button> 
          <button className="adding-button">
            Добавить экспонат
          </button>
          <button className="adding-button">
            Редактировать описание выставки
          </button> 
        </div>
      )}

      <div className='classList'>
        <ul>
        {catalog.showcases.length > 0 ? (
            catalog.showcases.map((item) => (
              <li key={item.id} className="list-item">
                <Link to={`/exhibition/room/showcase/${item.id}`}>
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
            value={newShowcases.showcasesName === '' ? `витрина ${catalog.showcases.length + 1}` : newShowcases.showcasesName}
            onChange={handleInputChange}
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
    </div>
  );
}
