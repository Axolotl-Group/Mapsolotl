import React from 'react';
import { useSelector } from 'react-redux';

import Box from './Box.jsx';

const ListContainer = () => {
  const listState = useSelector((store) => store.list.listTrails);
  // console.log(Array.isArray(listState));
  // const dispatch = useDispatch();

  // //sends a GET request to a backend API endpoint /api/info
  // async function infoClick(id) {
  //   const response = await fetch(
  //     '/api/info?' +
  //       new URLSearchParams({
  //         id: id,
  //       })
  //   );

  // const array = [];
  return (
    <div className="main-container">
      {listState.map((obj) => {
        return <Box key={obj.id} props={obj} />;
      })}
    </div>
  );

  // for (let listState[i] of listState) {
  // for (let i = 0; i < listState.length; i++) {
  //   array.push(

  //name, location, option to expand
  // get location data from API and push into listItems
};

export default ListContainer;
