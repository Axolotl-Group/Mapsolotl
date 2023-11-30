import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from './Box.jsx';
import FilterButton from './FilterButton.jsx';

const ListContainer = () => {
  const [filterValue, setFilterValue] = useState('');

  const listState = useSelector((store) => store.list.listTrails);
  const handleFilterChange = (newValue) => {
    setFilterValue(newValue);
  };
  return (
    <div>
      <div>
        {console.log(`ListContainer`)}
        <FilterButton
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className='main-container'>
        {listState.map((obj) => {
          //console.log(filterValue);
          return <Box key={obj.id} props={obj} filterValue={filterValue} />;
        })}
      </div>
    </div>
  );
};

export default ListContainer;
