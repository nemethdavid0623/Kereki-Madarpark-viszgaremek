import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './MainPage.css';

function Layout() {
  return (
    <div className="main-wrapper">
        <img src="/madarpark_header.png" alt="Balatoni Madárkert" className='header-img'/>
        
        <nav className="header-banner-nav">
          <ul className="nav-links">
            <Link to="http://localhost:5173/"><img src="/logo.png" alt="" className='logo'/></Link>
            <li><a href="#">Tartási<br/>tanácsok</a></li>
            <li><Link to="/allataink">Állataink</Link></li>
            <li><a href="#">Eladó <br/>példányaink</a></li>
            <li><a href="#">Rólunk</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </nav>
     
        <Outlet />
    
        <footer className="footer">footer</footer>
    </div>
  );
}

export default Layout;
