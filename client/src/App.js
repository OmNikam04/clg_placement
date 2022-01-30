import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Auth from './Auth/Auth'
import './app.css'

import { Navbar, Dashboard} from './component/exports'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/' element={<Dashboard/>}></Route>
    </Routes>
    </>
  );
}

export default App;
