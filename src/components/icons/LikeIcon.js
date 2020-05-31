import React from 'react';
import PropTypes from 'prop-types';

const LikeIcon = function ({ isLiked }) {
  return (
    <button
      className="sc-user-input--like-icon-wrapper"
    >
      <svg
        className={`sc-user-input--like-icon ${(isLiked ? 'liked' : 'not-liked')}`}

        height="18px"
        x="0px"
        y="0px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        enableBackground="new 0 0 24 24"
      >
        <g>
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </g>

      </svg>
    </button>)

};

LikeIcon.propTypes = {
  isLiked: PropTypes.bool,
};

export default LikeIcon;
