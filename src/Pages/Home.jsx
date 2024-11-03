import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import Header from '../Components/Header'; 

export default function Home() {

  const catalog = {
    title: 'Выставки',
    description: ' Музей истории детского движения ведёт историю с 1962 года. В 1985 г. был получен статус школьного и звание народного музея. Музей является структурным подразделением ГБПОУ «Воробьевы горы».\n\n   Музейная коллекция включает документы, фотографии, предметы, печатные издания и др., связанные с развитием детских движений на территории Москвы, Российской Федерации и СССР; документы организаторов, руководителей, исследователей детского движения. Отдельная коллекция включает фонды по истории Московского Дворца пионеров. Также в коллекции Музея представлены материалы о внешкольных организациях и материалах, связанных с историей детства. На данный момент фонды Музея насчитывают более 400 тысяч единиц хранения.',
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1' },
      { id: 1, exhibitionName: 'выставка 2' },
      { id: 2, exhibitionName: 'выставка 3' }
    ]
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
      <Header title={catalog.title} 
        count={catalog.exhibition.length} />
      <div className='classList'>{formatText(catalog.description)}</div>
      <div className='classList'>
        <ul>
          {catalog.exhibition.map((item) => (
            <li key={item.id} className="list-item">
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


