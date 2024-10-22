import React from 'react'
import Navbar from "./Components/Navbar"
import Header from "./Components/Header"
import Home from "./Pages/Home"


function App() {

  const catalog = 
  {
    title: 'Выставки',
    exhibition: 
    [
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
    <>
      <Navbar></Navbar>
      <Header catalog={catalog}></Header>
      <Home catalog={catalog}></Home>
    </>
  );
}

export default App;
