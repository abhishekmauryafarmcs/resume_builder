import React from 'react';
import './FullPagePreview.css';
import ResumePreview from './ResumePreview';

const FullPagePreview = ({ data }) => {
  return (
    <div className="full-page-preview">
      <div className="preview-actions">
        <button 
          className="print-button"
          onClick={() => window.print()}
        >
          Print Resume
        </button>
      </div>
      <ResumePreview data={data} />
    </div>
  );
};

export default FullPagePreview; 