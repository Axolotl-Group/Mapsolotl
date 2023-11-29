import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MoreInfo from './MoreInfo.jsx';
import { DISPLAY_MORE_INFO } from '../reducers/reducer.js';

const ListContainer = () => {
  const listState = useSelector((store) => store.list.listTrails);
  const dispatch = useDispatch();

  //sends a GET request to a backend API endpoint /api/info
  async function infoClick(id) {
    const response = await fetch(
      '/api/info?' +
        new URLSearchParams({
          id: id,
        })
    );

    const result = await response.json();
    console.log('result is' + result);
    dispatch(DISPLAY_MORE_INFO(result));
  }

  const array = [];
  // for (let listState[i] of listState) {
  for (let i = 0; i < listState.length; i++) {
    array.push(
      <div className="list-of-trails" key={i}>
        <h1>{listState[i].name}</h1>
        <div className="location">
          <h3>
            City:<span>{listState[i].city || 'N/A'}</span>
          </h3>
          <h3>
            Region:<span>{listState[i].region || 'N/A'}</span>
          </h3>
          <h3>
            Country:<span>{listState[i].country || 'N/A'}</span>
          </h3>
        </div>
        <div className="deets">
          <h3>
            Trail ID:<span>{listState[i].id || 'N/A'}</span>
          </h3>
          <h3>
            Length:<span>{listState[i].length || 'N/A'}</span>
          </h3>
          <h3>
            Difficulty:<span>{listState[i].difficulty || 'N/A'}</span>
          </h3>
          <h3>
            Lat:<span>{listState[i].lat || 'N/A'}</span>
          </h3>
          <h3>
            Long:<span>{listState[i].lon || 'N/A'}</span>
          </h3>
        </div>
        <div className="features">
          <h3>
            Features:<span>{listState[i].features || 'N/A'}</span>
          </h3>
        </div>
        <img src={listState[i].thumbnail}></img>
        <div>
          {'Website: '}
          <a href={listState[i].url}>{listState[i].url}</a>
        </div>

        <button
          onClick={() => {
            console.log(listState[i].id);
            infoClick(listState[i].id);
          }}
        >
          Get more info
        </button>
        <MoreInfo id={listState[i].id} />
      </div>
    );
  }
  //name, location, option to expand
  // get location data from API and push into listItems

  return <div className="listcontainer">{array}</div>;
};

export default ListContainer;
