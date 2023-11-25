import React from "react";

const ListContainer = () => {
  const listItems = [<li key="key">test</li>];
  // get location data from API and push into listItems

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
};

export default ListContainer;
