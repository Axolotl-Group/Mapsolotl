import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../moreInfo.scss';

const MoreInfo = (props) => {
  const moreInfo = useSelector((store) => store.list.moreInfo);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // function to handle backdrop click outside the modal
  const handleBackdropClick = (e) => {
    closeModal();
  };

  // useEffect(() => {
  //   // reset modal state to open after open once
  //   if (moreInfo[props.id]) {
  //     setIsModalOpen(true);
  //   }
  // }, [moreInfo, props.id]);

  if (moreInfo[props.id] && isModalOpen) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content">
          <div className="more-info">
            <div className="description">
              <h3>
                Description:{' '}
                <span>{moreInfo[props.id].description || 'N/A'}</span>
              </h3>
            </div>
            <div className="directions">
              <h3>
                Directions:{' '}
                <span>{moreInfo[props.id].directions || 'N/A'}</span>
              </h3>
            </div>
            {/* <button onClick={closeModal}>Close</button> */}
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default MoreInfo;
