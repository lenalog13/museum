import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import Header from '../Components/Header'; 

export default function Rooms() {

  const catalog = {
    title: 'Помещения',
    rooms: [
      { id: 0, roomsName: 'адрес 1 помещение 1' },
      { id: 1, roomsName: 'адрес 1 помещение  2' },
      { id: 2, roomsName: 'адрес 1 помещение  3' },
      { id: 3, roomsName: 'адрес 2 помещение 1' }
    ]
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.rooms.length} />
      <div className='classList'>
        <ul>
          {catalog.rooms.map((item) => (
            <li key={item.id} className="list-item">
              <Link to={`/warehouse/room/${item.id}`}>
                {item.roomsName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}