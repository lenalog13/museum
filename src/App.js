import React from 'react'
import Navbar from "./Components/Navbar"
import Header from "./Components/Header"
import Home from "./Pages/Home"


function App() {

  const catalog = [
    {
        id: 0,
        exhibition: 'выставка 1',
        showcases: ['витрина 1', 'витрина 2']
    },
    {
        id: 1,
        exhibition: 'выставка 2',
        showcases: ['витрина 1', 'витрина 2', 'витрина 3']
    },
    {
      id: 2,
      exhibition: 'выставка 3',
      showcases: ['витрина 1', 'витрина 2', 'витрина 3']
  }
];

  return (
    <>
      <Navbar></Navbar>
      <Header catalog={catalog}></Header>
      <Home catalog={catalog}></Home>
    </>
  );
}

export default App;
