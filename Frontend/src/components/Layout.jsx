import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const Layout=({children})=> {
  return (
    <div className="main-wrapper">
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
     
        <main>{children}</main>
    
        <footer className="footer">footer</footer>
    </div>
  );
}

export default Layout;
