import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Drawer,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../graphics/logo.png';
import HandHeart from '../graphics/hand_heart.png';
import SpiderWeb from '../graphics/spider_web.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogOutButton from "../LogOutButton/LogOutButton";
import './DrawerNav.css';



function DrawerNav() {

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const user = useSelector((store) => store.user);

    useEffect(() => {
        GoogleTranslateElementInit()
      }, [])
    
      const GoogleTranslateElementInit = () => {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
      }

    return (
        <div>
            <div className='button'>  
            <Button  onClick={() => setOpen(true)}>
                Menu
                </Button> 
                <div id="google_translate_element"></div>
                </div>
                
                
            <Drawer open={open} placement={placement} onClose={() => setOpen(false)}>
            
                <List>
                
                    <ListItem className='drawerNav'>  
                        <Link  to="/landing" onClick={() => setOpen(false)}>
                            <img src={Logo} alt="Solidarity Now!" />
                        </Link>          
                    </ListItem>

                    <ListItem className='drawerNav'>
                        <Link className='drawerNav' to="/about" onClick={() => setOpen(false)}>
                            About
                        </Link>
                    </ListItem>

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                        <Link className='drawerNav' to="/resources">
                            Resources
                        </Link>
                    </ListItem>

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                        <ListItemIcon sx={{width: 90}}>
                        <img alt='Two hands holding one another in a heart shape' 
                        src={HandHeart} />
                        <Link className='drawerNav' 
                        to="/offersForm" >
                            Offers/Requests
                        </Link>
                        </ListItemIcon>
                    </ListItem>

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                        <ListItemIcon sx={{width: 90}}>
                       <img alt='spider web' 
                       src={SpiderWeb} />
                        <Link className='drawerNav'  
                        to="/solidarityWeb" >
                            Solidarity Web
                        </Link>
                        </ListItemIcon>
                    </ListItem>

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                    <ListItemIcon sx={{width: 90}}>
                    <PersonOutlineIcon/>
                        <Link className='drawerNav' 
                        to="/user" >
                            Dashboard
                        </Link>
                        </ListItemIcon>
                    </ListItem>

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                        {!user.id && (
                            <Link to="login">
                                Login/Register
                            </Link>
                        )}
                    </ListItem>

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                        <LogOutButton className='drawerNav' />
                    </ListItem>

                    
                    
                </List>

            </Drawer>
        </div>

    )

}

export default DrawerNav;