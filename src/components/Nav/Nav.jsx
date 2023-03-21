import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Logo from '../graphics/logo.png'

import './Nav.css';


// import {ReactComponent as HandHeart} from '../graphics/hand_heart.svg';
// import {SvgIcon, SvgIconProps} from '@mui/material/';

function Nav() {
  const user = useSelector((store) => store.user);

  useEffect(() => {
    googleTranslateElementInit()
  }, [])

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }

  return (

    <div className="nav">

      <Link className='navLink' to="/landing">
        <img src={Logo} alt="Solidarity Now!" />
      </Link>

      <Link className="navLink" to="/about">
        About
      </Link>

      <Link className="navLink" to="/resources">
        Resources
      </Link>

      {!user.id && (
        <Link className="navLink" to="login">
          Login/Register
        </Link>
      )}

     
      <div id="google_translate_element"></div>

      <LogOutButton />
    </div>
  )
};


export default Nav;
