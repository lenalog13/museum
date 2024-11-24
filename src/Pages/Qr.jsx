import React, { useState } from 'react';
import './List.css';
import './Setting.css';
import Header from '../Components/Header'; 

export default function Qr() {

  const userRights = 'admin';

  const catalog = {
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1' },
      { id: 1, exhibitionName: 'выставка 2' },
      { id: 2, exhibitionName: 'выставка 3' },
    ]
  };

  
  return (
    <div>
      <Header title='Выберите элементы для формирования QR-кодов:'/>

      <div className='classList'>
        Тут пока ничего нет 🙁
      </div>

    </div>
  );
}