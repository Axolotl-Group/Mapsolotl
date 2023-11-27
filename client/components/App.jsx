import React from "react";
import ListContainer from "./ListContainer.jsx";
import zipCache from "../data/zipcodes.js";

const App = () => {
  return (
    <div className="App">
      <h1>GET BUSY BIKING OR GET BUSY DOING SOMETHING ELSE</h1>
      <div className="inputs">
        <label htmlFor="zip">ZIP CODE: </label>

        <input name="zip" type="text" id="zip" placeholder="Ex: 48912"></input>

        <label htmlFor="lat">LATITUDE: </label>
        <input name="lat" type="text" id="lat" placeholder="Optional"></input>
        <label htmlFor="long">LONGITUDE: </label>
        <input name="lon" type="text" id="long" placeholder="Optional"></input>
        <label htmlFor="radius">MILE RADIUS: </label>
        <input
          name="radius"
          type="text"
          id="radius"
          placeholder="Search Radius in Miles"
        ></input>
        <button
          onClick={() =>
            fetch(
              // '/search'
              "/search?" +
                new URLSearchParams({
                  lat:
                    zipCache[document.getElementById("zip").value].latitude ||
                    document.getElementById("lat").value,
                  lon:
                    zipCache[document.getElementById("zip").value].longitude ||
                    document.getElementById("long").value,
                  radius: document.getElementById("radius").value,
                })
            )
          }
          id="submit"
        >
          SUBMIT
        </button>
      </div>
      <ListContainer />
    </div>
  );
};

export default App;
