import React from 'react';
import { useParams, Link  } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 

export default function Showcases() {

  const { id } = useParams(); // Получение id из параметров URL 
  const catalog = {
    title: 'Витрины',
    description: ' Тут описание конкретно этой выставки ',
    showcases: [
      { id: 0, showcasesName: 'витрина 1' },
      { id: 1, showcasesName: 'витрина 2' },
      { id: 2, showcasesName: 'витрина 3' }
    ]
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
      <Header title={catalog.title} 
        count={catalog.showcases.length} />
      <div className='classHome'>{formatText(catalog.description)}</div>
      <div className='classHome'>
        <ul>
          {catalog.showcases.map((item) => (
            <li key={item.id} className="home-list-item">
                <Link to={`/exhibition/showcase/${item.id}`}>
                {item.showcasesName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
