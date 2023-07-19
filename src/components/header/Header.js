import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Search from '../search/Search';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, Container, NavItem, Navbar, Tab, Tabs } from 'react-materialize';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';


export default function Header() {

  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div className='navigation'>

      <Navbar
        alignLinks="right"
        brand={
          <a className="brand-logo" href="/">
            <img
              className="header_icon"
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              style={{
                width: '10%',
                height: '10%',
                borderRadius: '15%',
                marginLeft: '8%',
              }}
            />
          </a>
        }
        id="mobile-nav"
        menuIcon={<MenuIcon />}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
        className="custom-navbar"
      >
        <NavItem><Link to="/" style={{ textDecoration: 'none' }}><span>Home</span></Link></NavItem>
        <NavItem ><Link to="/movies/popular" style={{ textDecoration: 'none' }}><span >Popular</span></Link></NavItem>
        <NavItem ><Link to="/movies/top_rated" style={{ textDecoration: 'none' }}><span >Top Rated</span></Link></NavItem>
        <NavItem >
          <Link to="/movies/upcoming" style={{ textDecoration: 'none' }}><span >Upcoming</span></Link>
        </NavItem>

        <NavItem >
          <Link to="/like" style={{ textDecoration: 'none' }}><span >Favorites</span></Link>
        </NavItem>

        <NavItem >
          <Link to="/search" style={{ textDecoration: 'none' }}><span><SearchIcon /></span></Link>
        </NavItem>

        {localStorage.getItem('token') === null && (
          <NavItem >
            <Link to="/register" style={{ textDecoration: 'none' }}><span>Sign Up</span></Link>
          </NavItem>
        )}
        {localStorage.getItem('token') === null ? (
          <NavItem >
            <Link to="/login" style={{ textDecoration: 'none' }}><span>Sign In</span></Link>
          </NavItem>
        ) : (
          <>
            <Chip close={false} closeIcon={<CloseIcon />} options={null}>
              <img
                alt="Contact Person"
                className="responsive-img"
                src="https://res.cloudinary.com/teepublic/image/private/s--UymRXkch--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1570281377/production/designs/6215195_0.jpg"
              />
              {localStorage.getItem('token')}
            </Chip>
            <Chip
              close={false}
              closeIcon={<CloseIcon />}
              options={null}
              onClick={handleLogOut}
            >
              <LogoutIcon />
            </Chip>
          </>
        )}
      </Navbar>



    </div>
  )
}
