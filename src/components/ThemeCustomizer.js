import React from 'react';
import './ThemeCustomizer.css';

const ThemeCustomizer = ({ theme, onUpdate }) => {
  const fonts = [
    'Arial',
    'Times New Roman',
    'Helvetica',
    'Georgia',
    'Verdana',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat'
  ];

  const fontSizes = [
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '18px'
  ];

  return (
    <div className="theme-customizer">
      <h2>Customize Appearance</h2>
      <div className="customizer-options">
        <div className="option-group">
          <label htmlFor="font-select">Font Family:</label>
          <select
            id="font-select"
            value={theme.font}
            onChange={(e) => onUpdate({ ...theme, font: e.target.value })}
          >
            {fonts.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="font-size-select">Font Size:</label>
          <select
            id="font-size-select"
            value={theme.fontSize}
            onChange={(e) => onUpdate({ ...theme, fontSize: e.target.value })}
          >
            {fontSizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer; 