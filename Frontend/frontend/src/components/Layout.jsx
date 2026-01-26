

function Layout() {
  return (
    <body>
        <header className="header">
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
        </header>
    
        <footer className="footer">xyxx</footer>
    </body>
  );
}

export default Layout;
