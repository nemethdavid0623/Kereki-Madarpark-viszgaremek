import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './MainPage.css';

function Layout() {
  return (
    <div className="main-wrapper">
        <header className="header">
            <img src="/madarpark_header.png" alt="" />
           <div className='header-banner'>
        <nav className="navbar">
          <div className="nav-icon-wrapper">
          </div>
          
          <ul className="nav-links">
            <a href="http://localhost:5173/"><img src="/logo.png" alt="" className='logo'/></a>
            <li><a href="#">Tartási <br /> tanácsok</a></li>
            <li><Link to="/allataink">Állataink</Link></li>
            <li><a href="#">Eladó <br /> példányaink</a></li>
            <li><a href="#">Rólunk</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </nav>
      </div>
        </header>

      <main className="content-outlet">
        <Outlet />
      </main>
    
        <footer className="footer">xyxx</footer>
    </div>
  );
}

export default Layout;
