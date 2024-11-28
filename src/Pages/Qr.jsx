import React, { useState } from 'react';
import './Qr.css';
import Header from '../Components/Header'; 

export default function Qr() {
  const userRights = 'admin';

  const initialData = {
    exhibitions: [
      { id: 0, exhibitionsName: 'выставка 1', select: false },
      { id: 1, exhibitionsName: 'выставка 2', select: false },
      { id: 2, exhibitionsName: 'выставка 3', select: false }
    ],
    rooms: [
      { id: 0, roomsName: 'помещение 1', select: false },
      { id: 1, roomsName: 'помещение 2', select: false },
      { id: 2, roomsName: 'помещение 3', select: false }
    ],
    showcases: [
      { id: 0, showcasesName: 'витрина 1', select: false },
      { id: 1, showcasesName: 'витрина 2', select: false },
      { id: 2, showcasesName: 'витрина 3', select: false }
    ],
    shelves: [
      { id: 0, shelvesName: 'полка 1', select: false },
      { id: 1, shelvesName: 'полка 2', select: false },
      { id: 2, shelvesName: 'полка 3', select: false }
    ],
    exhibits: [
      { id: 0, exhibitsName: 'экспонат 1', select: false },
      { id: 1, exhibitsName: 'экспонат 2', select: false },
      { id: 2, exhibitsName: 'экспонат 3', select: false }
    ]
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('exhibitions');
  const [data, setData] = useState(initialData);
  
  const handleSelect = (id) => {
    setData(prevData => {
      const updatedData = { ...prevData };
      const currentItems = updatedData[selectedTab].map(item => {
        if (item.id === id) {
          return { ...item, select: !item.select };
        }
        return item;
      });
      updatedData[selectedTab] = currentItems;
      return updatedData;
    });
  };    

  const renderItems = () => {
    const items = data[selectedTab];
    return items.map((item) => (
      <div className='toggle' key={item.id}>
        <input
          type="checkbox"
          checked={item.select}
          onChange={() => handleSelect(item.id)}
        />
        {item[selectedTab + 'Name']}
      </div>
    ));
  };  

  const handleTabChange = (tab) => {
    setSelectedTab(tab);    
    setData(prevData => {
      const updatedData = { ...prevData };
      const newItems = updatedData[tab];
      newItems.forEach(item => item.select = false);
      return updatedData;
    });
  };

  const getSelectedItems = () => {
    return data[selectedTab].filter(item => item.select);
  };

  return (
    <div>
      <Header title='Выберите элементы для формирования QR-кодов:'/>
      <div className='tabs'>
        <button className={selectedTab === 'exhibitions' ? 'selected' : ''}  
          onClick={() => handleTabChange('exhibitions')}>
          Выставки
        </button>
        <button className={selectedTab === 'rooms' ? 'selected' : ''} 
          onClick={() => handleTabChange('rooms')}>
          Помещения
        </button>
        <button className={selectedTab === 'showcases' ? 'selected' : ''} 
          onClick={() => handleTabChange('showcases')}>
          Витрины
        </button>
        <button className={selectedTab === 'shelves' ? 'selected' : ''} 
          onClick={() => handleTabChange('shelves')}>
          Полки
        </button>
        <button className={selectedTab === 'exhibits' ? 'selected' : ''} 
          onClick={() => handleTabChange('exhibits')}>
          Экспонаты
        </button>
      </div>

      <div className='classList1'>
        {renderItems()}
      </div>

      {userRights !== 'user' && (
        <button className="select-button" onClick={() => setModalVisible(true)}>
          Выбрать
        </button> 
      )}

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Сформировать qr-код для:</h2>
            <ul>
              {getSelectedItems().map(item => (
                <li key={item.id}>{item[selectedTab + 'Name'] || item[selectedTab + 'sName']}</li>
              ))}
            </ul>
            <label>Выберите формат:</label>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setModalVisible(false)}>Отменить</button>
              <button className="save-button">
                Сформировать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}