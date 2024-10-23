import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 

export default function Racks() {
  const catalog = {
    title: 'Стеллажи',
    racks: [
      { id: 0, racksName: 'стеллаж 1' },
      { id: 1, racksName: 'стеллаж 2' },
      { id: 2, racksName: 'стеллаж 3' }
    ]
  };
  
  return (
    <div>
      <Header title={catalog.title} 
        count={catalog.racks.length} />
      <div className='classHome'>
        <ul>
          {catalog.racks.map((item) => (
            <li key={item.id} className="home-list-item">
              <Link to={`/warehouse/rack/${item.id}`}>
                {item.racksName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
