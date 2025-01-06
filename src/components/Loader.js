import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <div className="loader-circle"></div>
        <div className="loader-line-mask">
          <div className="loader-line"></div>
        </div>
      </div>
      <div className="loader-text-container">
        <div className="text-wrapper">
          <span className="main-text">Resume Builder</span>
          <div className="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
        <span className="by-text">by</span>
        <span className="author-text">Abhishek Maurya</span>
      </div>
    </div>
  );
};

export default Loader; 