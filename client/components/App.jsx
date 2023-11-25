import React from "react";
import ListContainer from "./ListContainer.jsx";

const App = () => {
  return (
    <div className="App">
      <h1>GET BUSY HIKING OR GET BUSY DOING SOMETHING ELSE</h1>
      <form action="/search" method="GET"><label htmlFor="lat">LATITUDE: </label>
      <input type="text" id="lat" name="lat"></input>
      <label htmlFor="long">LONGITUDE: </label>
      <input type="text" id="long" name="lon"></input>
      <label htmlFor="radius">MILE RADIUS: </label>
      <input type="text" name="radius" id="radius"></input>
      <button id="submit">SEARCH</button></form>
      
      <ListContainer />
    </div>
  );
};

export default App;
