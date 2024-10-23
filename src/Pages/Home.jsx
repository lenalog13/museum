import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 

export default function Home() {
  const catalog = {
    title: 'Выставки',
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1' },
      { id: 1, exhibitionName: 'выставка 2' },
      { id: 2, exhibitionName: 'выставка 3' }
    ]
  };

  return (
    <div>
      <Header title={catalog.title} 
        count={(catalog.exhibition == 0)? 0 : catalog.exhibition? catalog.exhibition.length : null} />
      <div className='classHome'>
      <ul>
          {catalog.exhibition.map((item) => (
            <li key={item.id} className="home-list-item">
              <Link to={`/exhibition/${item.id}`}>
                {item.exhibitionName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

