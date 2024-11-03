import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import Header from '../Components/Header'; 
import Sidebar from '../Components/Sidebar';

export default function Racks() {

  const [selectedItem, setSelectedItem] = useState(null);


  const items = [
    { id: 0, title: 'Стеллажи', racks: [{ id: 0, racksName: 'стеллаж 1' }, { id: 1, racksName: 'стеллаж 2' }, { id: 2, racksName: 'стеллаж 3' }] },
    { id: 1, title: 'Шкафы', racks: [{ id: 0, racksName: 'шкаф 1' }, { id: 1, racksName: 'шкаф 2' }, { id: 2, racksName: 'шкаф 3' }] },
    { id: 2, title: 'Сейфы', racks: [{ id: 0, racksName: 'сейф 1' }, { id: 1, racksName: 'сейф 2' }] }
  ];


  useEffect(() => {setSelectedItem(items[0]); }, []);

  return (
    <div>
      {selectedItem ? (
        <>
          <Header title={selectedItem.title} count={selectedItem.racks.length} />
          <div className="layout">
            <Sidebar onSelect={setSelectedItem} />
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
