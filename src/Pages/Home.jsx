import React from 'react';
import './Home.css';

const Home = ({ catalog }) => {
  return (
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
  );
};

export default Home;

