import React, { useState } from 'react';
import zipCache from '../data/zipcodes.js';
import { useDispatch } from 'react-redux';
import ListContainer from '../components/ListContainer.jsx';
import { DISPLAY_SEARCH } from '../reducers/reducer.js';
import Loading from '../components/Loading.jsx';
import MoreInfo from '../components/MoreInfo.jsx';
import Box from '../components/Box.jsx';
import Welcome from '../components/Welcome.jsx';

const Homepage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function searchClick() {
    //sends a GET request to a backend API endpoint /api/trails
    setIsLoading(true);
    const response = await fetch(
      '/api/trails?' +
        new URLSearchParams({
          lat: zipCache[document.getElementById('zip').value].latitude || '',
          lon: zipCache[document.getElementById('zip').value].longitude || '',
          radius: document.getElementById('radius').value,
        })
    );

    const result = await response.json();
    dispatch(DISPLAY_SEARCH(result));
    setIsLoading(false);
  }
  return (
    <div>
      <Welcome />
      <div className='App'>
        <div className='search-container'>
          <h1>Bike More, Worry Less</h1>
          <div className='inputs'>
            <input
              name='zip'
              type='text'
              id='zip'
              placeholder='ZIP CODE'
            ></input>
            <input
              name='radius'
              type='text'
              id='radius'
              placeholder='MILE RADIUS'
            ></input>

            <button onClick={searchClick} id='submit'>
              SUBMIT
            </button>
          </div>
        </div>

        <div className='main-container2'>
          {isLoading ? <Loading /> : <ListContainer />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
