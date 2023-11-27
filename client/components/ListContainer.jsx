import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ListContainer = () => {
  const listState = useSelector((store) => store.list.listTrails);
  const array = [];
  for (let trail of listState) {
    array.push(
      <div className='list-of-trails'>
        <h1>{trail.name}</h1>
        <ul>
          <li>{'Length: ' + trail.length + 'miles'}</li>
          <li>{'Description: ' + trail.description}</li>
          <li>{'Directions: ' + trail.directions}</li>
          <li>{'City: ' + trail.city}</li>
          <li>{'Region: ' + trail.region}</li>
          <li>{'Country: ' + trail.country}</li>
          <li>{'Latitude: ' + trail.lat}</li>
          <li>{'Longitude: ' + trail.lon}</li>
          <li>{'Difficulty: ' + trail.difficulty}</li>
          <li>{'Features: ' + trail.features}</li>
          <li>
            {'Website: '}
            <a href={trail.url}>{trail.url}</a>
          </li>
          <img src={trail.thumbnail}></img>
        </ul>
      </div>
    );
  }
  //name, location, option to expand
  // get location data from API and push into listItems

  return <div className='listcontainer'>{array}</div>;
};

export default ListContainer;
