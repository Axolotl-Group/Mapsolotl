import React from 'react';
// import { FaSpinner } from 'react-icons/fa';
import { GiOctopus } from 'react-icons/gi';
import '../loading.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <GiOctopus className="loading-spinner" />
    </div>
  );
};

export default Loading;
