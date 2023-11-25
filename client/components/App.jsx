import React from "react";
import ListContainer from "./ListContainer.jsx";

const App = () => {
  return (
    <div className="App">
      <h1>GET BUSY HIKING OR GET BUSY DOING SOMETHING ELSE</h1>
      <label htmlFor="lat">LATITUDE: </label>
      <input type="text" id="lat"></input>
      <label htmlFor="long">LONGITUDE: </label>
      <input type="text" id="long"></input>
      <label htmlFor="radius">MILE RADIUS: </label>
      <input type="text" id="radius"></input>
      <button id="submit">SEARCH</button>
      <ListContainer />
    </div>
  );
};

export default App;
