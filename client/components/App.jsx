import React, { useState } from 'react';
import zipCache from '../data/zipcodes.js';
import { useDispatch } from 'react-redux';
import ListContainer from './ListContainer.jsx';
import { DISPLAY_SEARCH } from '../reducers/reducer.js';
import Loading from './Loading.jsx';
import MoreInfo from './MoreInfo.jsx';
import Box from './Box.jsx';
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
