import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    
    <div className="main-wrapper">
      
      
      <img src="/madarpark_header.png" alt="" />

      <div className='header-banner'>
        <nav className="navbar">
          <div className="nav-icon-wrapper">
            
          </div>
          
          <ul className="nav-links">
            <a href="http://localhost:5173/"><img src="/logo.png" alt="" className='logo'/></a>
            <li><a href="#">Tartási <br /> tanácsok</a></li>
            <li><a href="#">Állataink</a></li>
            <li><a href="#">Eladó <br /> pédányaink</a></li>
            <li><a href="#">Rólunk</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </nav>
      </div>
      

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

      <div className="footer-line">
        footer
      </div>
    </div>
  );
};

export default MainPage;