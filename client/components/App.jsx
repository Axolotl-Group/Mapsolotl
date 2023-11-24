import React from "react";
import ListContainer from "./ListContainer.jsx";

const App = () => {
  return (
    <div>
      <label htmlFor="lat">LATITUDE: </label>
      <input type="text" id="lat"></input>
      <label htmlFor="long">LONGITUDE: </label>
      <input type="text" id="long"></input>
      <button id="submit">SUBMIT</button>
      <ListContainer />
    </div>
  );
};

export default App;
