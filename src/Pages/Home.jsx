import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Home() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Выставки',
    description: ' Музей истории детского движения ведёт историю с 1962 года. В 1985 г. был получен статус школьного и звание народного музея. Музей является структурным подразделением ГБПОУ «Воробьевы горы».\n\n   Музейная коллекция включает документы, фотографии, предметы, печатные издания и др., связанные с развитием детских движений на территории Москвы, Российской Федерации и СССР; документы организаторов, руководителей, исследователей детского движения. Отдельная коллекция включает фонды по истории Московского Дворца пионеров. Также в коллекции Музея представлены материалы о внешкольных организациях и материалах, связанных с историей детства. На данный момент фонды Музея насчитывают более 400 тысяч единиц хранения.',
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1' },
      { id: 1, exhibitionName: 'выставка 2' },
      { id: 2, exhibitionName: 'выставка 3' },
      { id: 3, exhibitionName: 'выставка 4' },
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newExhibition, setNewExhibition] = useState({
      exhibitionName: '',
      description: ''
  });

  const [editingExhibitionId, setEditingExhibitionId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewExhibition ({
          ...newExhibition,
          [name]: value
      });
  };

  const handleAddUser  = () => {
      if (editingExhibitionId !== null) {
          setCatalog(prevCatalog => ({
              ...prevCatalog,
              exhibition: prevCatalog.exhibition.map(exhibition =>
                exhibition.id === editingExhibitionId ? { ...exhibition, ...newExhibition  } : exhibition
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
          <button className="adding-button" onClick={() => setModalVisible(true)}>
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



    </div>
  );
}


