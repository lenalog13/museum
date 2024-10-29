import React from 'react';
import { Link  } from 'react-router-dom';
import './List.css';
import Header from '../Components/Header'; 

export default function Shelves() {

    const catalog = {
        title: 'Полки',
        description: ' Тут описание конкретно этой витрины',
        shelves: [  { id: 0, shelvesName: 'полка 1' },
                    { id: 1, shelvesName: 'полка 2' },
                    { id: 2, shelvesName: 'полка 3' } ]
    };

      const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
              {line.trim()}
              <br />
          </span>
        ));
      };

  return (
    <div>
      { <Header 
        title={catalog.title} 
        count = {catalog.shelves.length} /> }
    <div className='classHome'>{formatText(catalog.description)}</div>
    <div className='classHome'>
      <ul>
        {catalog.shelves.map((item) => (
          <li key={item.id} className="home-list-item">
            <Link to={`/exhibition/showcase/shelf/${item.id}`}>
              {item.shelvesName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}