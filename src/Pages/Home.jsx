import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Home() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Выставки',
    description: 'Музей истории детского движения ведёт историю с 1962 года. В 1985 г. был получен статус школьного и звание народного музея. Музей является структурным подразделением ГБПОУ «Воробьевы горы».\n\nМузейная коллекция включает документы, фотографии, предметы, печатные издания и др., связанные с развитием детских движений на территории Москвы, Российской Федерации и СССР; документы организаторов, руководителей, исследователей детского движения. Отдельная коллекция включает фонды по истории Московского Дворца пионеров. Также в коллекции Музея представлены материалы о внешкольных организациях и материалах, связанных с историей детства. На данный момент фонды Музея насчитывают более 400 тысяч единиц хранения.',
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1' },
      { id: 1, exhibitionName: 'выставка 2' },
      { id: 2, exhibitionName: 'выставка 3' },
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  const [newExhibition, setNewExhibition] = useState({
      exhibitionName: '',
      description: ''
  });

  const [museumDescription, setMuseumDescription] = useState(catalog.description);

  const [editingExhibitionId, setEditingExhibitionId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewExhibition ({
          ...newExhibition,
          [name]: value
      });
  };

  const handleAddExhibition  = () => {
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
      setNewExhibition (exhibition);
      setEditingExhibitionId(exhibition.id);
      setModalVisible(true);
  };

  const handleEditMuseumDescription = () => {
    setMuseumDescription(catalog.description);
    setDescriptionModalVisible(true);
  };

  const handleSaveDescription = () => {
    setCatalog(prevCatalog => ({
      ...prevCatalog,
      description: museumDescription
    }));
    setDescriptionModalVisible(false);
  };
  const handleCancelDescription = () => {
    setDescriptionModalVisible(false);
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
      setNewExhibition ({ exhibitionName: '', description: '' });
      setEditingExhibitionId(null);
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
        count={catalog.exhibition.length} />

      { userRights != 'user' && (
        <div className="pages-buttons">
          <button className="adding-button" onClick={() => setModalVisible(true)}>
            Добавить выставку
          </button> 
          <button className="adding-button" onClick={handleEditMuseumDescription}>
            Редактировать описание музея
          </button> 
        </div>
      )}

      <div className='classList'>{formatText(catalog.description)}</div>
      <div className='classList'>
        <ul>
          {catalog.exhibition.map((item) => (
            <li key={item.id} className="list-item">
              <Link to={`/exhibition/${item.id}`}>
                {item.exhibitionName}
              </Link>
              { userRights != 'user' && (
                <button className="setting-button" onClick={() => handleEditExhibition(item)} >
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
                    <h3>{editingExhibitionId !== null ?
                     'Редактировать выставку' : 'Добавить выставку'}
                    </h3>
                    <input
                        type="text"
                        name="exhibitionName"
                        placeholder="Название"
                        value={newExhibition.exhibitionName}
                        onChange={handleInputChange}
                    />
                    <label>Описание:</label>
                    <textarea
                      name="description"
                      placeholder="Описание"
                      value={newExhibition.description}
                      onChange={handleInputChange}
                      className="large-textarea" 
                    />
                    <div className="modal-buttons">
                        {editingExhibitionId !== null && (
                                <button className="delete-button" onClick={handleDeleteExhibition}>
                                    Удалить
                                </button>
                        )}
                        <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                        <button className="save-button" onClick={handleAddExhibition}>Сохранить</button>
                    </div>
                </div>
            </div>
        )}

        {descriptionModalVisible && ( 
        <div className="modal-overlay">
          <div className="modal">
            <h3>Редактировать описание музея</h3>
            <textarea
              name="museumDescription"
              placeholder="Описание музея"
              value={museumDescription}
              onChange={(e) => setMuseumDescription(e.target.value)}
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


