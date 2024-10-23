import React, { useState } from 'react';
import './Home.css';
import Header from '../Components/Header'; 

export default function Home() {
  const catalog = {
    title: 'Выставки',
    exhibition: [
      {
        id: 0,
        exhibitionName: 'выставка 1',
        showcases: ['витрина 1', 'витрина 2']
      },
      {
        id: 1,
        exhibitionName: 'выставка 2',
        showcases: ['витрина 1', 'витрина 2', 'витрина 3']
      },
      {
        id: 2,
        exhibitionName: 'выставка 3',
        showcases: ['витрина 1', 'витрина 2']
      }
    ]
  };

  return (
    <div>{ <Header catalog={catalog} /> }
    <div className='classHome'>
      <ul>
        {catalog.exhibition.map((item) => (
          <li key={item.id} className="home-list-item">
            <a href="#" onClick={(e) => e.preventDefault()}>
              {item.exhibitionName}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}


