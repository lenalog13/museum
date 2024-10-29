import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import Header from '../Components/Header'; 

export default function WarehouseExhibits() {

  const catalog = {
    title: 'Экспонаты',
    exhibits: [
      { id: 0, exhibitsName: 'экспонат 1' },
      { id: 1, exhibitsName: 'экспонат 2' },
      { id: 2, exhibitsName: 'экспонат 3' }
    ]
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.exhibits.length} />
      <div className='classHome'>
        <ul>
          {catalog.exhibits.map((item) => (
            <li key={item.id} className="home-list-item">
              <Link to={`/warehouse/rack/shelf/box/exhibit/${item.id}`}>
                {item.exhibitsName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}