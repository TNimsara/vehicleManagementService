import React from 'react';
import './Header.css'; // Import your custom CSS file
import { FaUser } from 'react-icons/fa'; // Import the User icon
import logo from '@/assets/logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
      <div>
        <img src={logo} alt="logo" className="header-logo" />
        </div>
        <nav>
          <ul>
          <li>
            <a href="/">
                <FaUser style={{ marginRight: '14px', fontSize: '25px', marginTop: '14px' }}  />
                {/* Customer icon here */}
            </a>
           </li>
            <div className="customer-info">
                <p className="customer-name">Customer name</p>
                 <p className="customer-role">Customer</p>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
