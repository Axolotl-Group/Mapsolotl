import React from 'react';
import { useDispatch } from 'react-redux';
import ListContainer from './ListContainer.jsx';
import { DISPLAY_SEARCH } from '../reducers/reducer.js';

const App = () => {
  const dispatch = useDispatch();
  async function searchClick() {
    const response = await fetch(
      '/search?' +
        new URLSearchParams({
          lat: document.getElementById('lat').value,
          lon: document.getElementById('long').value,
        })
    );

    const result = await response.json();
    console.log('result is' + result);
    dispatch(DISPLAY_SEARCH(result));
  }

  return (
    <div className='App'>
      <h1>GET BUSY HIKING OR GET BUSY DOING SOMETHING ELSE</h1>

      <label htmlFor='lat'>LATITUDE: </label>
      <input
        name='lat'
        type='text'
        id='lat'
      ></input>
      <label htmlFor='long'>LONGITUDE: </label>
      <input
        name='lon'
        type='text'
        id='long'
      ></input>
      <label htmlFor='radius'>MILE RADIUS: </label>
      <input
        name='radius'
        type='text'
        id='radius'
      ></input>
      <button
        onClick={searchClick}
        id='submit'
      >
        SUBMIT
      </button>

      <ListContainer />
    </div>
  );
};

export default App;
