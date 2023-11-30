import React, { useState } from 'react';
import MoreInfo from './MoreInfo.jsx';
import { useDispatch } from 'react-redux';
import { DISPLAY_MORE_INFO } from '../reducers/reducer.js';
import { FaHeart } from 'react-icons/fa';

const Box = ({ props, filterValue }) => {
  const [isLikeed, setIsLikeed] = useState(false);
  const dispatch = useDispatch();

  const handleHeartClick = () => {
    setIsLikeed(!isLikeed);
  };

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

  // Conditionally render based on filterValue
  const shouldRender =
    !filterValue ||
    props.difficulty.toLowerCase().includes(filterValue.toLowerCase());

  return (
    <div
      className='list-of-trails'
      style={{ display: shouldRender ? 'block' : 'none' }}
    >
      <h1>{props.name}</h1>
      <div onClick={handleHeartClick} className='heart'>
        <FaHeart
          size={30}
          style={{ color: isLikeed ? '#b91c1c' : '#fefce8' }}
        />
      </div>

      <div className='location'>
        <h3>
          City:<span>{props.city || 'N/A'}</span>
        </h3>
        <h3>
          Region:<span>{props.region || 'N/A'}</span>
        </h3>
        <h3>
          Country:<span>{props.country || 'N/A'}</span>
        </h3>
      </div>
      <div className='deets'>
        <h3>
          Trail ID:<span>{props.id || 'N/A'}</span>
        </h3>
        <h3>
          Length:<span>{props.length || 'N/A'}</span>
        </h3>
        <h3>
          Difficulty:<span>{props.difficulty || 'N/A'}</span>
        </h3>
        <h3>
          Lat:<span>{props.lat || 'N/A'}</span>
        </h3>
        <h3>
          Long:<span>{props.lon || 'N/A'}</span>
        </h3>
      </div>
      <div className='features'>
        <h3>
          Features:<span>{props.features || 'N/A'}</span>
        </h3>
      </div>
      <img src={props.thumbnail}></img>
      <div>
        {'Website: '}
        <a href={props.url}>{props.url}</a>
      </div>
      <div className='infoButton'>
        <button
          onClick={() => {
            console.log(props.id);
            infoClick(props.id);
          }}
        >
          Get more info
        </button>
      </div>
      <MoreInfo id={props.id} />
    </div>
  );
};

export default Box;
