import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logo }) => {
  return (
    <nav className="navbar navbar-expand-sm nav">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="h2-pink" id="see-cards" to="/cards">
              <h2>See All Cards</h2>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
