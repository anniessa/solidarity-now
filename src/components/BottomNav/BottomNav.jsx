import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import LanguageIcon from '@mui/icons-material/Language'
import HandHeart from '../graphics/hand_heart.png';
import SpiderWeb from '../graphics/spider_web.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Tooltip from '@mui/material/Tooltip';
import './BottomNav.css'
import { useSelector } from 'react-redux';

function BottomNav() {
    const user = useSelector((store) => store.user);


    const styles = {
      stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
      },
    };

    return (
        <BottomNavigation
        sx={{ position: 'fixed', bottom: 0, width: 1.0 }}
        showLabel={true}
          >
            
      
    {user.id && (
      <>
      <Tooltip title='Offers/Requests' enterTouchDelay={0} placement='top'>
      <BottomNavigationAction 
      label="Offers/Requests" 
      icon={<img alt='Two hands holding one another in a heart shape' src={HandHeart} />} 
      component={Link} to='/offersForm'/>
      </Tooltip>

      <BottomNavigationAction 
      label="Solidarity Web" 
      icon={<img alt='Cartoon spider web' src={SpiderWeb}/>} 
      component={Link} to='/solidarityWeb'/>

      <BottomNavigationAction 
      label="Account"  
      icon={<PersonOutlineIcon />} 
      component={Link} to='/user'/>
      
      <LogOutButton className="navLink" />
      </>
      )}
  
      </BottomNavigation> 
    )
}

export default BottomNav;