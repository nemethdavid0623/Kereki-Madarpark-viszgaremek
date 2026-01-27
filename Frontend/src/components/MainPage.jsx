import React from 'react';
import './MainPage.css';


const MainPage = () => {
  return (
    
    <div className="main-wrapper">

      <div className="header-banner">
        <h2>Üdvözlünk a Balatoni Madárkertben!</h2>
      </div>
      
      <div className="description-banner">-*9
        <p>rövid leírás</p>
      </div>

      <div className="content-container">
        
        <div className="content-row">
          <div className="image-placeholder">kép</div>
          <div className="text-placeholder">szöveg</div>
        </div>

        <div className="content-row reverse">
          <div className="image-placeholder">kép</div>
          <div className="text-placeholder">szöveg</div>
        </div>

        <div className="content-row">
          <div className="image-placeholder">kép</div>
          <div className="text-placeholder">szöveg</div>
        </div>

      </div>

    </div>
  );
};

export default MainPage;