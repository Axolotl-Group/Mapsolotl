import React from 'react';
import { useSelector } from 'react-redux';

import Box from './Box.jsx';

const ListContainer = () => {
  const listState = useSelector((store) => store.list.listTrails);

  return (
    <div className="main-container">
      {listState.map((obj) => {
        return <Box key={obj.id} props={obj} />;
      })}
    </div>
  );
};

export default ListContainer;
