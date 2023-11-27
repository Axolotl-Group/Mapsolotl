import React from 'react';
import ListContainer from './ListContainer.jsx';

const App = () => {
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
        onClick={() =>
          fetch(
            // '/search'
            '/search?' +
              new URLSearchParams({
                lat: document.getElementById('lat').value,
                lon: document.getElementById('long').value,
              })
          ).then(res => res.json())
        }
        id='submit'
      >
        SUBMIT
      </button>

      <ListContainer />
    </div>
  );
};

export default App;
