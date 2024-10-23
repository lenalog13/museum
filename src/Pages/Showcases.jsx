import React, { useState } from 'react';
import './Home.css';
import Header from '../Components/Header'; 

export default function Showcases() {

  const catalog = {
    title: 'Витрины',
    showcases: [
      {
        id: 0,
        showcasesName: 'витрина 1'
      },
      {
        id: 1,
        showcasesName: 'витрина 2'
      },
      {
        id: 2,
        showcasesName: 'витрина 3'
      } 
    ]
  };

  return (
    <div>
      { <Header 
        title={catalog.title} 
        count = {(catalog.showcases == 0)? 0 : catalog.showcases? catalog.showcases.length : null} /> }
    <div className='classHome'>
      <ul>
        {catalog.showcases.map((item) => (
          <li key={item.id} className="home-list-item">
            <a href="#" onClick={(e) => e.preventDefault()}>
              {item.showcasesName}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}