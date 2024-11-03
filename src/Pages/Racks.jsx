import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Sidebar.css';
import Header from '../Components/Header'; 


export default function Racks() {

  const items = [
    { id: 0, title: 'Стеллажи', racks: [{ id: 0, racksName: 'стеллаж 1' }, { id: 1, racksName: 'стеллаж 2' }, { id: 2, racksName: 'стеллаж 3' }] },
    { id: 1, title: 'Шкафы', racks: [{ id: 0, racksName: 'шкаф 1' }, { id: 1, racksName: 'шкаф 2' }, { id: 2, racksName: 'шкаф 3' }] },
    { id: 2, title: 'Сейфы', racks: [{ id: 0, racksName: 'сейф 1' }, { id: 1, racksName: 'сейф 2' }] }
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };


  return (
    <div>
      {selectedItem ? (
        <>
          <Header title={selectedItem.title} count={selectedItem.racks.length} />
          <div className="layout">
            <div className="sidebar">
              <div className="buttons">
                {items.map(item => (
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

