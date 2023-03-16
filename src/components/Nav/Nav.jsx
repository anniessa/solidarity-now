import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../graphics/logo.png'

import './Nav.css';


// import {ReactComponent as HandHeart} from '../graphics/hand_heart.svg';
// import {SvgIcon, SvgIconProps} from '@mui/material/';

function Nav() {
  const user = useSelector((store) => store.user);

  

  function changeLang(option) {
    localStorage.setItem('lang', option.target.value);
    window.location.reload();
  }

  const lang = localStorage.getItem('lang') || 'en';
  // 

  // function HandIcon(SvgIconProps) {
  //   return (
  //     <SvgIcon {...props}>
  //       <HandHeart />
  //     </SvgIcon>
  //   )
  // }

  return (

    <div className="nav">

      <img src={Logo} alt="Solidarity Now!" width="100" height="69"/>

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

        <select className='drop-down-language' onChange={changeLang} value={lang}>
          <option value="en">English</option>
          <option value="ar">عربي</option>
          <option value="es">Español</option>
        </select>
        </div>
        )
        };

  
export default Nav;
