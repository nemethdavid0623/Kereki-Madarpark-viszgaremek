import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page-content">
      <img src="/madarpark_header.png" alt="Balatoni Madárkert" className='header-img'/>

      <nav className="header-banner-nav">
          <ul className="nav-links">
            <Link to="http://localhost:5173/"><img src="/logo.png" alt="" className='logo'/></Link>
            <li><Link to="http://localhost:5173/Animals">Tenyészetünk</Link></li>
            <li><a href="#">Eladó példányaink</a></li>
            <li><a href="#">Árak, Nyitvatartás</a></li>
            <li><a href="#">Házirend</a></li>
            <li><a href="http://localhost:5173/Login">Admin</a></li>
          </ul>
        </nav>

      <div className="header-banner">
        <h2>Üdvözlünk a Balatoni Madárkertben!</h2>
      </div>
      
      <div className="description-banner">
        <p>rövid leírás</p>
      </div>

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
  );
};

export default MainPage;