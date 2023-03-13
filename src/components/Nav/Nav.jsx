import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';


function Nav() {
  const user = useSelector((store) => store.user);

  function changeLang(option) {
    localStorage.setItem('lang', option.target.value);
    window.location.reload();
  }

  const lang = localStorage.getItem('lang') || 'en';

  return (
    
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Solidarity Now!</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to='/offersForm'>
              Offers/Requests
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
        
        <Link className="navLink" to="/about">
          About
        </Link>

        <select className='drop-down-language' onChange={changeLang} value={lang}>
            <option value="en">English</option>
            <option value="ar">عربي</option>
            <option value="es">Español</option>
        </select>
      </div>
    </div>
  );
}

export default Nav;
