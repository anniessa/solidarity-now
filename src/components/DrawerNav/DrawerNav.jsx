import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Drawer,
    Button,
    List,
    ListItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../graphics/logo.png';
import LogOutButton from "../LogOutButton/LogOutButton";
import './DrawerNav.css';



function DrawerNav() {

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const user = useSelector((store) => store.user);

    useEffect(() => {
        googleTranslateElementInit()
      }, [])
    
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
      }
    

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Click me</Button>
            <Drawer style={{ width: '50%' }} open={open} placement={placement} onClose={() => setOpen(false)}>
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
                        {!user.id && (
                            <Link to="login">
                                Login/Register
                            </Link>
                        )}
                    </ListItem>

                    
                    <div id="google_translate_element"></div>
                  

                    <ListItem className='drawerNav' onClick={() => setOpen(false)}>
                        <LogOutButton className='drawerNav' />
                    </ListItem>

                </List>

            </Drawer>
        </div>

    )

}

export default DrawerNav;