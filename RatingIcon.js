import React from 'react';
import PropTypes from 'prop-types';

function RatingIcon({ fill }) {
  return (
    <svg
      viewBox="0 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      fill={fill}
    >
      <path
        className="star"
        d="m12.944 11.534 5.535-4.279h-6.734L9.5.521 7.255 7.255H.521l5.542 4.262-2.175 6.962 5.621-4.31 5.607 4.31-2.172-6.945Z"
      />
    </svg>
  );
}

RatingIcon.propTypes = {
  fill: PropTypes.string.isRequired,
};

export default RatingIcon;
