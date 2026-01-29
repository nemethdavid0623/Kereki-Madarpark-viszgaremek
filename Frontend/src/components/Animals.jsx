import React from 'react';
import './Animals.css';

const Animals = (props) => {
  return (
    <div className="bird-card">
      <div className="bird-img-placeholder">
        {props.image ? <img src={props.image} alt={props.SpeciesName} /> : "kép"}
      </div>
      <div className="bird-label">
        <p>{props.SpeciesName}</p>
        <button className="more-btn">Továbbiak</button>
      </div>
    </div>
  );
};

export default Animals;