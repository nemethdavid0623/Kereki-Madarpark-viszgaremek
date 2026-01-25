import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-wrapper">
      {/* Üdvözlő sáv */}
      <div className="header-banner">
        <h2>Üdvözlünk a Balatoni Madárkertben!</h2>
      </div>
      
      {/* Rövid leírás sáv */}
      <div className="description-banner">-*9
        <p>rövid leírás</p>
      </div>

      {/* Tartalmi szekciók */}
      <div className="content-container">
        
        {/* 1. blokk: Kép balra, szöveg jobbra */}
        <div className="content-row">
          <div className="image-placeholder">kép</div>
          <div className="text-placeholder">szöveg</div>
        </div>

        {/* 2. blokk: Szöveg balra, kép jobbra (megfordítva) */}
        <div className="content-row reverse">
          <div className="image-placeholder">kép</div>
          <div className="text-placeholder">szöveg</div>
        </div>

        {/* 3. blokk: Kép balra, szöveg jobbra */}
        <div className="content-row">
          <div className="image-placeholder">kép</div>
          <div className="text-placeholder">szöveg</div>
        </div>

      </div>

      {/* Footer sáv */}
      <div className="footer-line">
        footer
      </div>
    </div>
  );
};

export default MainPage;