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

    const [value, setValue] = useState('');

    return (
        <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);}}
          >
      

    {user.id && (
      <>
      <BottomNavigationAction label='Offers/Requests' value='/offersForm' icon={<NoteAddIcon />} component={Link} to='/offersForm'/>
      <BottomNavigationAction label='Solidarity Web' value='/solidarityWeb' icon={<LanguageIcon />} component={Link} to='/solidarityWeb'/>
      <BottomNavigationAction label='User Account' value='/user' icon={<PersonOutlineIcon />} component={Link} to='/user'/>

      <LogOutButton className="navLink" />
      </>
      )}

      </BottomNavigation>
    )
}

export default BottomNav;