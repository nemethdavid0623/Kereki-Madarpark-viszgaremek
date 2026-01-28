import React from 'react';
import './Animals.css';
import { Link } from 'react-router-dom';

const Animals = (props) => {
  return<>
    <img src="" alt="kephelye" />
    <h2>{props.SpeciesName}</h2>
    <button>Továbbiak</button>
  </>
};

export default Animals;