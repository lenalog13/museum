import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 

export default function Boxes() { 

  const catalog = {
    title: 'Коробки',
    boxes: [
      { id: 0, boxesName: 'коробка 1' },
      { id: 1, boxesName: 'коробка 2' },
      { id: 2, boxesName: 'коробка 3' }
    ]
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.boxes.length} />
      <div className='classHome'>
        <ul>
          {catalog.boxes.map((item) => (
            <li key={item.id} className="home-list-item">
              <Link to={`/warehouse/rack/shelf/box/${item.id}`}>
                {item.boxesName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}