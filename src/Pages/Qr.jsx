import React, { useState, useEffect } from 'react';
import './Qr.css';
import Header from '../Components/Header';
import Exhibition from '../services/Exhibition'; // Импортируем сервис для работы с выставками

export default function Qr() {
  const userRights = 'admin';

  const initialData = {
    exhibitions: [],
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

  const formatQr = {
    exhibitions: ['1 формат qr-кода для выставки', '2 формат qr-кода для выставки'],
    showcases: ['1 формат qr-кода для витрины', '2 формат qr-кода для витрины'],
    shelves: ['1 формат qr-кода для полки', '2 формат qr-кода для полки'],
    exhibits: ['1 формат qr-кода для экспоната', '2 формат qr-кода для экспоната']
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('exhibitions');
  const [data, setData] = useState(initialData);
  const [selectedFormat, setSelectedFormat] = useState(null);

  useEffect(() => {
    // Загружаем данные с бэкенда при монтировании компонента
    Exhibition.getExhibition().then(response => {
      const exhibitions = response.data.map((exhibition, index) => ({
        id: exhibition.id,
        exhibitionsName: exhibition.name,
        select: false
      }));
      setData(prevData => ({
        ...prevData,
        exhibitions
      }));
    }).catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
  }, []);

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

  const getAllFormatsForCurrentTab = () => {
    return formatQr[selectedTab];
  };

  return (
    <div>
      <Header title='Выберите элементы для формирования QR-кодов:' />
      <div className='tabsQr'>
        <button className={selectedTab === 'exhibitions' ? 'selected' : ''}
          onClick={() => handleTabChange('exhibitions')}>
          Выставки
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
            <ul className='selectedDescriptions'>
              {getSelectedItems().length === 0 ? (
                <label>Вы не выбрали ни одного объекта 🙁</label>
              ) : (
                getSelectedItems().map(item => (
                  <li key={item.id}>{item[selectedTab + 'Name'] || item[selectedTab + 'sName']}</li>
                ))
              )}
            </ul>
            <label>Выберите формат:</label>
            <ul className='formatQr'>
              {getAllFormatsForCurrentTab().map((format, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    name="qrFormat"
                    value={format}
                    checked={selectedFormat === format}
                    onChange={() => setSelectedFormat(format)}
                  />
                  {format}
                </li>
              ))}
            </ul>
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