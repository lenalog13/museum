import React, { useState, useEffect, useRef } from 'react';
import { Link  } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Showcases() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Витрины и экспонаты',
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

  const exhibits = [
    { id: '3', title: 'экспонат 4', description: [] }, 
    { id: '4', title: 'экспонат 5', description: [] }, 
    { id: '5', title: 'экспонат 6', description: [] }, 
    { id: '6', title: 'экспонат 7', description: [] }, 
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleExhibit, setModalVisibleExhibit] = useState(false);

  const [newShowcases, setNewShowcases] = useState({
      showcasesName: '',
      description: []
  });

  const [newExhibits, setNewExhibits] = useState({
    id: '',
    exhibitsName: '',
    description: []
});

  const [editingShowcasesId, setEditingShowcasesId] = useState(null);

  const [editingExhibitsId, setEditingExhibitsId] = useState(null);

  const [filteredExhibits, setFilteredExhibits] = useState([]);

  const [inputValue, setInputValue] = useState(null);

  const [error, setError] = useState(false);

  const dropdownRef = useRef(null);

  const handleInputChangeExhibit = (e) => {
      const { name, value } = e.target;
      setNewExhibits({
          ...newExhibits,
          [name]: value
      });
  };

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
    resetFormExhibit();
};

  const handleEditShowcases  = (showcases) => {
      setNewShowcases (showcases);
      setEditingShowcasesId(showcases.id);
      setModalVisible(true);
  };

const handleCancelExhibit = () => {
    resetFormExhibit();
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

  const handleDeleteExhibits = (id) => {
    setCatalog(prevCatalog => ({
      ...prevCatalog,
      exhibits: prevCatalog.exhibits.filter(exhibit => exhibit.id !== id)
    }));
    resetFormExhibit();
  };
  

  const resetForm = () => {
      setNewShowcases ({ showcasesName: '', description: [] });
      setEditingShowcasesId(null);
      setModalVisible(false);
  };

  const resetFormExhibit = () => {
    setNewExhibits({ id: '', exhibitsName: '', description: []});
    setEditingExhibitsId(null);
    setModalVisibleExhibit(false);
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

      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить витрину
          </button> 
          <button className="adding-button" onClick={() => setModalVisibleExhibit(true)}>
            Добавить экспонат
          </button>
          <button className="adding-button">
            Редактировать описание помещения
          </button> 
        </div>
      )}

    <div className='classList'>
        <h3>Витрины:</h3>
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
      <div className='classList'>
        <h3>Экспонаты:</h3>
        <ul>
          {catalog.exhibits.length > 0 ? (
            catalog.exhibits.map((exhibit) => (
              <li key={exhibit.id} className="list-item">
                <Link to={`/exhibition/room/exhibit/${exhibit.id}`}>
                  {exhibit.exhibitsName}
                </Link>
                { userRights !== 'user' && (
                  <div className='exhibition-buttons'>
                  <button className="setting-button">
                    Переместить
                  </button>
                  <button className="setting-button" onClick={() => {
                    if (window.confirm('Вы действительно хотите удалить экспонат?')) {
                      handleDeleteExhibits(exhibit.id);
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

      {modalVisibleExhibit && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Добавить экспонат</h3>
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
                      onChange={handleInputChangeExhibit}
                  />
                  <div className="modal-buttons">
                    <button className="cancel-button" onClick={handleCancelExhibit}>Отменить</button>
                    <button className="save-button" onClick={handleAddExhibits}>
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
        )}
    </div>
  );
}
