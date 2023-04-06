import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Accordion, AccordionDetails, Avatar, Button, Card, Modal, Stack, TextField } from '@mui/material';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import axios from 'axios';
import { PhotoCamera } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ViewUser from '../ViewUser/ViewUser';
import { PostContext } from '../../store/PostContext';
import { PostInfoContext } from '../../store/PostInfoContext';
import { makeRequest } from '../../axios';
import { config } from '../../url';

import PeopleIcon from '@mui/icons-material/People';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';



export default function Topbar({ socket }) {

    const navigate = useNavigate()
    const logout = () => {
        // localStorage.removeItem("user")
        // window.location.reload(false);
        navigate('/admin')
    }




    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorE2(null);
    };




    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };






    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <HomeIcon />
                </IconButton>
                <p>Home</p>
            </MenuItem>



            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <BookmarkIcon />
                </IconButton>
                <p>Saved</p>
            </MenuItem>


            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>


        </Menu>
    );







    useEffect(() => {




    }, [])



    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: ' #150b33', position: 'sticky', top: '0' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                    onClick={() => { navigate('/admindashboard') }}
                >
                    Tycoon Connect
                </Typography>

                <HandshakeOutlinedIcon sx={{ display: { xs: 'block', sm: 'none', margin: '25px' } }} />
                {/* <img src='logo.jpg' style={{width:'100px',height:'50px'}} sx={{ display: { xs: 'block', sm: 'none'} }} /> */}



                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    <IconButton color="inherit">
                    <Stack direction="row" gap={1} >
                        <PeopleIcon />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer',fontSize:'15px' } }}
                            onClick={() => { navigate('/usermanagement') }}
                        >
                            User Management
                        </Typography>
                        </Stack>
                    </IconButton>


                    <IconButton color="inherit">
                        <Stack direction="row" gap={1} >
                        <ReportProblemIcon/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer',fontSize:'15px' } }}
                            onClick={() => { navigate('/reportmanagement') }}
                        >
                            Reports
                        </Typography>
                        </Stack>
                    </IconButton>


                    <IconButton onClick={logout} size="large" color="inherit">
                        <LogoutIcon />
                 
                    </IconButton>



                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            {renderMobileMenu}

        </AppBar>

        // </Box>
    );
}