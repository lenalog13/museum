import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Sidebar.css';
import Header from '../Components/Header'; 


export default function Racks() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState(
    [
      { id: 0, title: 'Стеллажи', racks: [{ id: 0, racksName: 'стеллаж 1' }, { id: 1, racksName: 'стеллаж 2' }, { id: 2, racksName: 'стеллаж 3' }] },
      { id: 1, title: 'Шкафы', racks: [{ id: 0, racksName: 'шкаф 1' }, { id: 1, racksName: 'шкаф 2' }, { id: 2, racksName: 'шкаф 3' }] },
      { id: 2, title: 'Сейфы', racks: [{ id: 0, racksName: 'сейф 1' }, { id: 1, racksName: 'сейф 2' }] }
    ]
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [newRacks, setNewRacks] = useState({
    racksName: '',
  });

  const [editingRacksId, setEditingRacksId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(catalog[0]);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRacks ({
          ...newRacks,
          [name]: value
      });
  };

  const handleAddRacks  = () => {
    if (editingRacksId !== null) {
      setCatalog(prevCatalog => ({
        ...prevCatalog,
          racks: prevCatalog.racks.map(racks =>
          racks.id === editingRacksId ? { ...racks, ...newRacks } : racks
        )
      }));
    } else {
      const newId = catalog.rooms.length;
      setCatalog({
        ...catalog,
        racks: [...catalog.racks, { id: newId, ...newRacks }]
      });
    }
    resetForm();
  };

  const handleEditRacks  = (racks) => {
      setNewRacks (racks);
      setEditingRacksId(racks.id);
      setModalVisible(true);
  };

  const handleCancel = () => {
      resetForm();
  };

  const handleDeleteRacks = () => {
    let confirmationMessage;

    switch (selectedItem) {
        case 0:
            confirmationMessage = 'Вы действительно хотите удалить стеллаж?';
            break;
        case 1:
            confirmationMessage = 'Вы действительно хотите удалить витрину?';
            break;
        case 2:
            confirmationMessage = 'Вы действительно хотите удалить сейф?';
            break;
        default:
            confirmationMessage = 'Вы действительно хотите удалить этот элемент?';
    }

    if (window.confirm(confirmationMessage)) {
        setCatalog(prevCatalog => ({
            ...prevCatalog,
            racks: prevCatalog.racks.filter(rack => rack.id !== editingRacksId)
        }));
        resetForm();
    }
  };

  const resetForm = () => {
      setNewRacks ({ racksName: '' });
      setEditingRacksId(null);
      setModalVisible(false);
  };

  return (
    <div>
      {selectedItem ? (
        <>
          <Header title={selectedItem.title} count={selectedItem.racks.length} />
          <div className="layout">
            <div className="sidebar">
              <div className="buttons">
                {catalog.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={selectedItem.id === item.id ? 'sidebar-buttons selected-item' : 'sidebar-buttons'}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div className='classList'>
              <ul>
                {selectedItem.racks.map((item) => (
                  <li key={item.id} className="list-item">
                    <Link to={`/warehouse/room/rack/${item.id}`}>
                      {item.racksName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
}

