import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <div className='routerContainers'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
