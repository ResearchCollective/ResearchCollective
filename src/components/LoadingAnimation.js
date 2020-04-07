import React from 'react';
import PropTypes from 'prop-types';

import '../styles/LoadingAnimation.scss';

const LoadingAnimation = ({ colorTheme, threadLoading }) => (
  <div style={{ color: colorTheme }} className={`la-ball-pulse-sync ${threadLoading ? 'threadLoading' : ''}`}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

LoadingAnimation.propTypes = {
  colorTheme: PropTypes.string,
  threadLoading: PropTypes.bool
};

export default LoadingAnimation;