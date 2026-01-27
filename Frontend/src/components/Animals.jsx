import React from 'react';
import './Animals.css';
import { Link } from 'react-router-dom';

const Allataink = () => {
  const cards = [1, 2, 3, 4, 5, 6]; // 6 kártya generálása

  return (
    <div className="birds-page-wrapper">

      {/* Kereső */}
      <div className="birds-search-bar">
        <label>KERESŐ: </label>
        <input type="text" />
      </div>

      {/* Rövid leírás */}
      <div className="birds-desc-box">
        <p>rövid leírás</p>
      </div>

      {/* Galéria rács */}
      <div className="birds-grid">
        {cards.map((item) => (
          <div key={item} className="bird-card">
            <div className="bird-img-placeholder">kép</div>
            <div className="bird-label">mi van a képen</div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Allataink;