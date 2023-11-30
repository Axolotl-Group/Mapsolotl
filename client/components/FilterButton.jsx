import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FilterButton = ({ filterValue, onFilterChange }) => {
  const listState = useSelector((store) => store.list.listTrails);
  console.log(listState);
  if (listState.length) {
    return (
      <div className='filterbuttons'>
        <button
          onClick={() => onFilterChange('Beginner')}
          className={filterValue === 'Beginner' ? 'active' : ''}
        >
          Beginner
        </button>
        <button
          onClick={() => onFilterChange('Intermediate')}
          className={filterValue === 'Intermediate' ? 'active' : ''}
        >
          Intermediate
        </button>
        <button
          onClick={() => onFilterChange('Advanced')}
          className={filterValue === 'Advanced' ? 'active' : ''}
        >
          Advanced
        </button>
      </div>
    );
  }
};

export default FilterButton;
