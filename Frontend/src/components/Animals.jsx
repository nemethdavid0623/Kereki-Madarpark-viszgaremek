import React from 'react';
import './Animals.css';

const Animals = (props) => {
  return (
    <div className="bird-card">
      <div className="bird-img-placeholder">
        {/* Ha van kép, azt rakjuk ide, ha nincs, marad a szöveg */}
        {props.image ? <img src={props.image} alt={props.SpeciesName} /> : "kép"}
      </div>
      <div className="bird-label">
        <p>{props.SpeciesName}</p>
        {/* Itt a "mi van a képen" rész a mintából */}
        <button className="more-btn">Továbbiak</button>
      </div>
    </div>
  );
};

export default Animals;