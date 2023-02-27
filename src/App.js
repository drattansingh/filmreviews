import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ContainerHome from './ContainerHome';

import './App.css';

const App=()=>{

  return(
    <>
    <Routes>
        <Route exact path="/" element={<ContainerHome/>}></Route>
    </Routes>
    </>
  );
}

export default App;
