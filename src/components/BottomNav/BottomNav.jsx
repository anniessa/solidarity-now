import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import LanguageIcon from '@mui/icons-material/Language'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
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
        showLabels={true}
          >
      
    {user.id && (
      <>
      <BottomNavigationAction label="Offers/Requests" icon={<NoteAddIcon />} component={Link} to='/offersForm'/>
      <BottomNavigationAction label="Solidarity Web" icon={<LanguageIcon />} component={Link} to='/solidarityWeb'/>
      <BottomNavigationAction label="Account"  icon={<PersonOutlineIcon />} component={Link} to='/user'/>
      
      <LogOutButton className="navLink" />
      </>
      )}
  
      </BottomNavigation> 
    )
}

export default BottomNav;