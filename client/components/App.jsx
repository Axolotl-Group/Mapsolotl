import React from 'react';
import zipCache from '../data/zipcodes.js';
import { useDispatch } from 'react-redux';
import ListContainer from './ListContainer.jsx';
import { DISPLAY_SEARCH } from '../reducers/reducer.js';

const App = () => {
  const dispatch = useDispatch();

  async function searchClick() {
    //sends a GET request to a backend API endpoint /api/trails
    const response = await fetch(
      '/api/trails?' +
        new URLSearchParams({
          lat:
            zipCache[document.getElementById('zip').value].latitude ||
            document.getElementById('lat').value,
          lon:
            zipCache[document.getElementById('zip').value].longitude ||
            document.getElementById('long').value,
          radius: document.getElementById('radius').value,
        })
    );

    const result = await response.json();
    //console.log('result is' + result);
    dispatch(DISPLAY_SEARCH(result));
  }

  return (
    <div className="App">
      <div className="search-container">
        <h1>GET BUSY BIKING OR GET BUSY DOING SOMETHING ELSE</h1>
        <div className="inputs">
          <label htmlFor="zip">ZIP CODE: </label>

          <input
            name="zip"
            type="text"
            id="zip"
            placeholder="Ex: 48912"
          ></input>

          <label htmlFor="lat">LATITUDE: </label>
          <input name="lat" type="text" id="lat" placeholder="Optional"></input>

          <label htmlFor="long">LONGITUDE: </label>
          <input
            name="lon"
            type="text"
            id="long"
            placeholder="Optional"
          ></input>

          <label htmlFor="radius">MILE RADIUS: </label>
          <input
            name="radius"
            type="text"
            id="radius"
            placeholder="Default: 25 miles"
          ></input>

          <button onClick={searchClick} id="submit">
            SUBMIT
          </button>
        </div>
      </div>

      <div className="main-container">
        <ListContainer />
      </div>
    </div>
  );
};

export default App;
