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
            <li><a href="#">Tartási tanácsok</a></li>
            <li><Link to="http://localhost:5173/Animals">Állataink</Link></li>
            <li><a href="#">Eladó példányaink</a></li>
            <li><a href="#">Rólunk</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </nav>
     
        <main>{children}</main>
    
        <footer className="footer">footer</footer>
    </div>
  );
}

export default Layout;
