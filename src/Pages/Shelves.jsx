import React, { useState } from 'react';
import './Home.css';
import Header from '../Components/Header'; 

export default function Shelves() {

  const catalog = {
    title: 'Полки',
    shelves: [
      {
        id: 0,
        shelvesName: 'полка 1'
      },
      {
        id: 1,
        shelvesName: 'полка 2'
      },
      {
        id: 2,
        shelvesName: 'полка 3'
      } 
    ]
  };

  return (
    <div>
      { <Header 
        title={catalog.title} 
        count = {(catalog.shelves == 0)? 0 : catalog.shelves? catalog.shelves.length : null} /> }
    <div className='classHome'>
      <ul>
        {catalog.shelves.map((item) => (
          <li key={item.id} className="home-list-item">
            <a href="#" onClick={(e) => e.preventDefault()}>
              {item.shelvesName}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}