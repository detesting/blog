import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      <Link to="/sign-in" className="link_sign_in">
        Sign In
      </Link>
      <Link to="/sign-up" className="link_sign_up">
        <button className="btn_sign_up">Sign Up</button>
      </Link>
    </div>
  );
}

export default Header;
