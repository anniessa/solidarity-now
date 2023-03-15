import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
      {/* <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}>
      {/* {!user.id && (
      <BottomNavigationAction label='Login' value='/login' icon={<HomeIcon />} component={Link} to='/login' />
      )}

    {user.id && (
      <>
      <BottomNavigationAction label='Home' value='/home' icon={<HomeIcon />} component={Link} to='/home' />
      <BottomNavigationAction label='Offers/Requests' value='/offersForm' icon={<NoteAddIcon />} component={Link} to='/offerForm'/>
      <BottomNavigationAction label='Solidarity Web' value='/solidarityWeb' icon={<LanguageIcon />} component={Link} to='/solidarityWeb'/>
      <LogOutButton className="navLink" />
      </>
      )}

      </BottomNavigation>
     */}
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
        
        
        
        

      


//       {/* // <div>
//       //   {/* If no user is logged in, show these links */}
//       {/* //   {!user.id && ( */}
//       //     // If there's no user, show login/registration links
//       {/* //     <Link className="navLink" to="/login">
//       //       Login / Register
//       //     </Link>
//       //   )} */}

//       {/* //   If a user is logged in, show these links
//       //   {user.id && ( */}
//     /
//       {/* //       <Link className="navLink" to="/info">
//       //         Info Page
//       //       </Link> */}

//       {/* //       <Link className="navLink" to='/offersForm'>
//       //         Offers/Requests
//       //       </Link> */}
// {/* 
//       //       <Link className="navLink" to='/solidarityWeb'>
//       //         Solidarity Web
//       //       </Link>
//       {/* //     </>
//       //   )} */}


        
  
  
export default Nav;
