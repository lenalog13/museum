import React, { useState, useEffect, useRef} from 'react';
import { Link, useParams  } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 
import Shelving from '../services/Shelving';

export default function Showcases() {

  
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

  const { id } = useParams();
  const roomId = id;
  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Витрины и экспонаты',
    description: [],
    showcases: [
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

  const fetchShelvings = async () => {
      try {
          const response = await Shelving.getShelvings(roomId);
          console.log(response)
          setCatalog(prevCatalog => ({
              ...prevCatalog,
              showcases: response.data
          }));
      } catch (error) {
          console.error('Error fetching shelvings:', error);
      }
  };
  useEffect(() => {

    fetchShelvings();
}, [roomId]);

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

  const handleAddShowcases = async () => {
    const shelvingNumber = newShowcases.showcasesName;
    const exhibitionId = window.location.pathname.split('/')[2]; 

    if (isNaN(shelvingNumber)) {
        alert("Пожалуйста, введите корректный номер витрины.");
        return;
    }
    try {
      console.log(shelvingNumber, roomId, exhibitionId)
        await Shelving.createShelving(shelvingNumber, roomId, exhibitionId, "");
        fetchShelvings();
    } catch (error) {
        console.error('Error creating shelving:', error);
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

const handleDeleteShowcase = async (shelvingId) => {
  if (window.confirm('Вы действительно хотите удалить витрину?')) {
      try {
          await Shelving.deleteShelving(shelvingId);
          fetchShelvings();
      } catch (error) {
          console.error('Error deleting shelving:', error);
      }
  }
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
          <Link className="discription" to={`/exhibition/${exhibitionId}/room/description`}>
            <button className="adding-button">
              Описание помещения
            </button> 
          </Link>
        </div>
      )}

    <div className='classList'>
        <h3>Витрины:</h3>
        <ul>
          {catalog.showcases.length > 0 ? (
            catalog.showcases.map((item) => (
              <li key={item.id} className="list-item">
                <Link to={`/exhibition/${exhibitionId}/room/showcase/${item.id}`}>
                  витрина {item.number}
                </Link>
                { userRights !== 'user' && (
                  <button className="setting-button" onClick={() => handleDeleteShowcase(item.id)}>
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
      <div className='classList'>
        <h3>Экспонаты:</h3>
        <ul>
          {catalog.exhibits.length > 0 ? (
            catalog.exhibits.map((exhibit) => (
              <li key={exhibit.id} className="list-item">
                <Link to={`/exhibition/${exhibitionId}/room/exhibit/${exhibit.id}`}>
                  {exhibit.exhibitsName}
                </Link>
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
            placeholder="Введите номер витрины"
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
