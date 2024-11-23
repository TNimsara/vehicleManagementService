import React from 'react';
import { FaFacebookF, FaGoogle, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Company Info */}
        <div className="mb-4">
          <h4 className="font-bold text-yellow-500 mb-2">Shantha Engineering(PVT) Ltd.</h4>
          <p>No:520, Tangalle Road, Welewaththa, Matara.</p>
          <p>Phone: 041-2227703</p>
        </div>

        {/* Services Links */}
        <div className="mb-4">
          <h4 className="font-bold text-yellow-500 mb-2">Services</h4>
          <ul>
            <li>Full Service</li>
            <li>Normal Service</li>
            <li>Service History Access</li>
          </ul>
        </div>

        {/* About Links */}
        <div className="mb-4">
          <h4 className="font-bold text-yellow-500 mb-2">About</h4>
          <ul>
            <li>Our Values</li>
            <li>Mission / Vision</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <h4 className="font-bold text-yellow-500 mb-2">Contact</h4>
          <ul>
            <li>Phone: 041-2227703</li>
            <li>Email: Shantha12@gmail.com</li>
            <li>Fax: 041-2227703</li>
          </ul>
        </div>
      </div>

      {/* Copyright and Social Icons */}
      <div className="bg-black py-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-xs">Copyright © 2024 all received by: <span className="text-yellow-500">Group 4</span></p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaFacebookF />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaGoogle />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
