import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import Header from '../Components/Header'; 

export default function WarehouseShelves() {


  const catalog = {
    title: 'Полки',
    shelves: [
      { id: 0, shelvesName: 'полка 1' },
      { id: 1, shelvesName: 'полка 2' },
      { id: 2, shelvesName: 'полка 3' }
    ]
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.shelves.length} />
      <div className='classList'>
        <ul>
          {catalog.shelves.map((item) => (
            <li key={item.id} className="list-item">
              <Link to={`/warehouse/room/rack/shelf/${item.id}`}>
                {item.shelvesName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}