import React from 'react';
import './Home.css';

//тут тоже пишется логика, в основном связь с бэком. Тут логика, которая должна обрабатываться независимо от твоей функции

export default function Home() {

//здесь пишется вся логика сайта. Обработка нажатия на кнопку и прописывание последующего действия, все циклы, связь с бэком, 
//"Console.log()" и тд. Здесь ты пишешь на java script

    let catalog = [
        {
            id: 0,
            exhibition: 'выставка 1',
            showcases: ['витрина 1', 'витрина 2']
        },
        {
            id: 1,
            exhibition: 'выставка 2',
            showcases: ['витрина 1', 'витрина 2', 'витрина 3']
        }
    ];

    return (

  //здесь вёрстка. Реакт очень удобен тем, что позволяет писать файлы формата jsx, которые помогают связывать как верстку, так и код
  //на java script не громоздя 1000+ файлов для этого, писали б мы без реакта

  <div className='classHome'>
  <ul>
      {catalog.map((item) => (
          <li key={item.id}>
              <a href="#" onClick={(e) => e.preventDefault()}>
                  {item.exhibition}
              </a>
          </li>
      ))}
    </ul>
  </div>

    );
}

