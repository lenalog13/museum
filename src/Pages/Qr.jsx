import React, { useState, useEffect } from 'react';
import './Qr.css';
import Header from '../Components/Header';
import Exhibition from '../services/Exhibition'; // Импортируем сервис для работы с выставками
import Qr_code from '../services/Qr_code';

export default function Qr() {
  const userRights = 'admin';

  const initialData = {
    exhibitions: [],
    rooms: [],
    showcases: [],
    shelves: [],
    exhibits: []
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('exhibits');
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
    Qr_code.getRooms().then(response => {
      const rooms = response.data.map((room, index) => ({
        id: room.id,
        roomsName: room.number,
        select: false
      }));
      setData(prevData => ({
        ...prevData,
        rooms
      }));
    }).catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
    /*
    Qr_code.getShelfs().then(response => {
      const shelves = response.data.map((shelf, index) => ({
        id: shelf.id,
        shelvesName: shelf.number,
        select: false
      }));
      setData(prevData => ({
        ...prevData,
        shelves
      }));
      console.log(shelves)
    }).catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
    Qr_code.getShelvings().then(response => {
      const showcases = response.data.map((showcase, index) => ({
        id: showcase.id,
        showcasesName: showcase.number,
        select: false
      }));
      setData(prevData => ({
        ...prevData,
        showcases
      }));
      console.log(showcases)
    }).catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
    */
    Qr_code.getExhibits().then(response => {
      const exhibits = response.data.map((exhibit, index) => ({
        id: exhibit.exhibitId,
        exhibitsName: exhibit.exhibitName,
        descriptionId: exhibit.descriptionId,
        select: false
      }));
      setData(prevData => ({
        ...prevData,
        exhibits
      }));
    }).catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
  }, []);

  

  const getQr = () => {
    if (selectedTab === 'exhibits') {
      const exhibitId = getSelectedItems().map(item => item.id);
      const descriptionId = getSelectedItems().map(item => item.descriptionId);

      Qr_code.generateExhibitsQr(exhibitId, descriptionId)
          .then(response => {
              // Проверяем, что ответ не пустой
              if (response.data) {
                  // Создаем URL для скачивания
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'exhibits_qr_code.pdf'); // Укажите имя файла
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
              } else {
                  console.error('Ответ пустой');
              }
          })
          .catch(error => {
              console.error('Ошибка при генерации QR-кода:', error);
          });
    } else {
      const ids = getSelectedItems().map(item => (
        item.id
      ))
      const qrType = "EXHIBITION";
      Qr_code.generateQr(ids, qrType)
    }
    setModalVisible(false);
  }

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
      <Header title='Выберите элементы для формирования QR-кодов:' />
      <div className='tabsQr'>
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
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setModalVisible(false)}>Отменить</button>
              <button className="save-button" onClick={() => getQr()}>
                Сформировать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
        /*
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
      */
}