import React from 'react';
import { useParams, Link  } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 

export default function Shelves() {

    const { id } = useParams(); // Получение id из параметров URL 
    const catalog = {
        title: 'Полки',
        description: ' Тут описание конкретно этой витрины',
        shelves: [  { id: 0, shelvesName: 'полка 1' },
                    { id: 1, shelvesName: 'полка 2' },
                    { id: 2, shelvesName: 'полка 3' } ]
    };

      // Функция для преобразования текста 
      const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
              {'\u00A0\u00A0\u00A0\u00A0'} {/* 4 пробела */}
              {line.trim()}
              <br />
          </span>
        ));
      };

  return (
    <div>
      { <Header 
        title={catalog.title} 
        count = {(catalog.shelves == 0)? 0 : catalog.shelves? catalog.shelves.length : null} /> }
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