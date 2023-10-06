import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Drawer,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Logo from "../graphics/logo.png";
import HandHeart from "../graphics/hand_heart.png";
import SpiderWeb from "../graphics/spider_web.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./DrawerNav.css";

function DrawerNav() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const user = useSelector((store) => store.user);

  return (
    <div>
      <div className="button">
        <MenuIcon onClick={() => setOpen(true)} />
      </div>

      <Drawer
        PaperProps={{
          sx: {
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            // justifyContent: 'space-evenly'
          },
        }}
        open={open}
        placement={placement}
        onClose={() => setOpen(false)}
      >

        <div onClick={() => setOpen(false)}>
        <Button component={Link}
        variant="none"
            to="/landing">
              <img
                src={Logo}
                alt="Solidarity Now!"
                style={{ margin: 0, height: 58 }}
              />
            </Button>
        </div>
   

          <div className="drawerNav" onClick={() => setOpen(false)}>
          <Button
              component={Link}
              to="/offersForm"
              onClick={() => setOpen(false)}
              variant="none"
            >
              <img
                alt="Two hands holding one another in a heart shape"
                src={HandHeart}
                style={{ marginRight: 7, height: 40 }}
              />
               Offer/Request Form
            </Button>
          </div>

          <div className="drawerNav" onClick={() => setOpen(false)}>
          <Button
              component={Link}
              to="/solidarityWeb"
              onClick={() => setOpen(false)}
              variant="none"
            >
              <img
                alt="spider web"
                src={SpiderWeb}
                style={{ marginRight: 7, height: 40 }}
              />
               Solidarity Web
            </Button>
          </div>

            <Button 
            onClick={() => setOpen(false)}
            component={Link}
              to="/user"
              variant="none"
              sx={{display: "flex", alignItems: "flex-end"}}
              >
            <PersonOutlineIcon sx={{ marginRight: 1, fontSize: '3em' }}/>
              Profile
            </Button>

            <Button 
            onClick={() => setOpen(false)}
            component={Link}
              to="/resources"
              variant="none"
              sx={{display: "flex", alignItems: "flex-end", mt: 1}}
              >
              Resources
            </Button>

            <Button 
            onClick={() => setOpen(false)}
            component={Link}
              to="/about"
              variant="none"
              sx={{display: "flex", alignItems: "flex-end", mt: 1}}
              >
              About
            </Button>

          <ListItem className="drawerNav" onClick={() => setOpen(false)}>
            {!user.id && <Link to="login">Login/Register</Link>}
          </ListItem>

          <ListItem className="drawerNav" onClick={() => setOpen(false)}>
            <LogOutButton />
          </ListItem>

      </Drawer>
    </div>
  );
}

export default DrawerNav;
