import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 

export default function Exhibits() {

    const { id } = useParams(); // Получение id из параметров URL 
    const catalog = {
        title: 'Экспонаты',
        description: ' Тут описание конкретно этой полки ',
        exhibits: [  { id: 0, exhibitsName: 'экспонат 1' },
                     { id: 1, exhibitsName: 'экспонат 2' },
                     { id: 2, exhibitsName: 'экспонат 3' } ]
    };

      // Функция для преобразования текста 
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
        count = {catalog.exhibits.length} /> }
    <div className='classHome'>{formatText(catalog.description)}</div>
    <div className='classHome'>
      <ul>
        {catalog.exhibits.map((item) => (
          <li key={item.id} className="home-list-item">
            <Link to={`/exhibition/showcase/shelf/exhibit/${item.id}`}>
              {item.exhibitsName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}