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

import UploadWidget from '../UploadWidget';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

})




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));



const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px"
})



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Topbar({ socket }) {

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("user")
        window.location.reload(false);
        navigate('/login')
    }



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    const [caption, setcaption] = useState('');
    const [location, setlocation] = useState('');
    const [description, setdescription] = useState('');
    const [postpic, setpostpic] = useState('');
    const [postpreview, setpostpreview] = useState('');

    const { currentUser } = useContext(AuthContext)
    const userid = currentUser.userid;
    console.log(userid, "CURRENT USERRR");


    const [search, setSearch] = useState('')
    const [usernames, setusernames] = useState([])
    const [onlyusernames, setonlyusernames] = useState([])
    const [userdetails, setuserdetails] = useState([])
    const { setPostDetails } = useContext(PostContext)
    // const { setPostInfo } = useContext(PostInfoContext)

    const [currentsendername, setcurrentsendername] = useState(null)
    const [currentsendertype, setcurrentsendertype] = useState(null)

    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorE2(null);
    };



    const [postID, setPostID] = useState([])


    const [errormsg, seterrormsg] = useState({});


    const [notifications, setnotifications] = useState([])
    const [notificationlength, setnotificationlength] = useState([])

    // const socket = useRef()

    useEffect(() => {

        socket?.on("getNotification", (data) => {
            setnotifications((prev) => [...prev, data])
        })

        socket?.on("getNotificationCount", (data) => {
            setnotificationlength((prev) => [...prev, data])
        })

    }, [socket])

    console.log(notifications, "Notificationssss");
    console.log(notificationlength, "Notificationsss  count@@@@@@@@");



    function displayNotifications(senderName, type) {
        console.log(senderName, type, "Sender name and type reached");
        let action;
        if (type === 1) {
            action = "liked"
        } else if (type === 2) {
            action = "commented"
        } else if (type === 3) {
            action = "texted"
        } else if (type === 4) {
            action = "Calling"
            return <span className='notification' >{`${senderName} is ${action} you`}</span>
        }

        return <span className='notification' >{`${senderName} ${action} your post`}</span>
    }

    // console.log(profilepic.name,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

    const imageUpload = (e) => {
        console.log("aaaaaaa", e.target.files[0]);
        setpostpic(e.target.files[0])
        setpostpreview(URL.createObjectURL(e.target.files[0]))
    }


    // console.log("POST IDDDDDDDDDDDDDdd", postID);

    const [issubmit, setissubmit] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        // handleClose();
        seterrormsg(validate(url, caption, location, description));
        setissubmit(true)
    }


    useEffect(() => {

        console.log(url);
        // console.log(postpic.name);
        console.log(caption);
        console.log(location);
        console.log(description);

        let currentTime = new Date()

        const formdata = new FormData();
        formdata.append("postpic", url)
        formdata.append("caption", caption)
        formdata.append("description", description)
        formdata.append("location", location)
        formdata.append("userid", id)
        formdata.append("createdAt", currentTime)


        console.log(formdata, "FORMDATAAA");
        // for (const [key, value] of formdata.entries()) {
        //     console.log(key, value);
        //   } 

        if (Object.keys(errormsg).length === 0 && issubmit) {

            makeRequest.post('/users/post', formdata).then((response) => {

                if (response.status) {
                    console.log(response.data, "Dataaaaa");
                    console.log(response.status);
                    console.log("Hellooooooooo");
                    // alert("Post created successfully")
                    setOpen(true);

                    window.location.reload(false);
                    navigate('/')
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                console.log(err);
                alert(err.response.data)
                console.log("-----errrrr---", err.response.data);

            })

        }
        // navigate('/form')


    }, [errormsg])



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



    const [posts, setposts] = useState([])
    const [profile, setprofile] = useState([])
    const [profileview, setprofileview] = useState('');

    const [useremail, setuseremail] = useState('')

    const [url, seturl] = useState('')
    const [error, updateError] = useState('')


    function handleOnUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true,
            });
            return;
        }
        seturl(result?.info?.secure_url);
    }


    // const navigate = useNavigate()
    // const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR");



    const handleclear = () => {
        setnotifications([])


        makeRequest.post('/users/deletenotification', { userid: id }).then((response) => {

            console.log(response, "Deleted notification RESSSSSSS");
            if (response.status) {
                console.log(response?.data, " Deleted Dataaaaa");
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }


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
        // style={{overflowY:'scroll'}}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <HomeIcon />
                </IconButton>
                <p>Home</p>
            </MenuItem>

            <MenuItem onClick={handleShow}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <AddCircleIcon />
                </IconButton>
                <p>create</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <BookmarkIcon />
                </IconButton>
                <p>Saved</p>
            </MenuItem>


            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>


            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );





    const searchUsers = () => {

        makeRequest.get('/users/getallusers').then((response) => {

            console.log(response, "Get user names");
            if (response.status) {
                console.log(response?.data, "Get user dataaaaaaa");
                setusernames(response?.data)

                // const un = usernames.map((u) =>
                //     console.log(u.username, "gtedfffffff")
                // )
                // console.log(un, "...........");


                console.log("Hoiiiiiiiiiiii");

                // alert("Post Details kitti")
                // navigate('/profile')
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }



    useEffect(() => {

        makeRequest.get(`/users/getprofile/${id}`).then((response) => {

            console.log(response, "Get Profile");
            if (response.status) {
                console.log(response?.data, "Get Profile dataaaaaaa");
                setprofile(response?.data)

                console.log("Hoiiiiiiiiiiii");
                // alert("Post Details kitti")
                // navigate('/profile')
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.get(`/users/getuseremail/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Emaillllll");
                setuseremail(response?.data)

                console.log("Haiiii");
                // alert("Post Details kitti")
                // navigate('/')
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })

        //     const fetchNotification= () => {    makeRequest.get('/users/getnotifications').then((response) => {

        //         console.log(response, "Get notificationss");
        //         if (response.status) {
        //             console.log(response?.data, "Get notification dataaaaaaa");
        //             // setprofile(response?.data)
        //             // setnotifications((prev) => [...prev, response?.data])
        //             setnotifications(response?.data)
        //         }
        //         else {
        //             alert("Something went wrong")
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //         alert(err.response.data)
        //         console.log("-----errrrr---", err.response.data);

        //     })
        // }
        //     const fetchNotificationLength = () => {
        //         makeRequest.get(`/users/getnotificationlength/${id}`)
        //             .then((response) => {
        //                 console.log(response, "Get notification length");
        //                 if (response.status) {
        //                     console.log(response?.data, "Get notification length");
        //                     setnotificationlength(response?.data)
        //                 } else {
        //                     alert("Something went wrong")
        //                 }
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //                 alert(err.response.data)
        //                 console.log("-----errrrr---", err.response.data);
        //             });
        //     }

        //         const interval = setInterval(() => {
        //             fetchNotificationLength();
        //             fetchNotification();

        //           }, 5000);

        //           return () => clearInterval(interval);


    }, [])


    const validate = (url, caption, location, description) => {
        const errors = {}


        if (!url) {
            errors.url = "url is required"
        } else if (!caption) {
            errors.caption = "caption is required"
        } else if (!location) {
            errors.location = "location is required"
        } else if (!description) {
            errors.description = "description is required"
        }

        return errors;
    }


    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: ' #150b33', position: 'sticky', top: '0' }}>
            <Toolbar>
                {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                    onClick={() => { navigate('/') }}
                >
                    Tycoon Connect
                </Typography>

                <HandshakeOutlinedIcon sx={{ display: { xs: 'block', sm: 'none', margin: '25px' } }} />
                {/* <img src='logo.jpg' style={{width:'100px',height:'50px'}} sx={{ display: { xs: 'block', sm: 'none'} }} /> */}
                <Search>
                    <Button onClick={searchUsers} >
                        <SearchIconWrapper>
                            <SearchIcon style={{ color: 'white' }}
                                name='searchSubmit'
                                type='submit'
                            />
                        </SearchIconWrapper>
                    </Button>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {console.log(search, "::::::::::::::::::::")}

                </Search>


                <Card style={{ position: 'absolute', top: 50, left: 260 }}>
                    {usernames && usernames.map((user, index) => {

                        return <div key={user._id}  >

                            {/* {console.log(search, ";;;;;")} */}
                            {console.log(search.trim(), ";;;;;")}
                            {/* {user.username} */}
                            {/* {console.log(`${user.username}`)} */}
                            {/* {setonlyusernames(`${user.username}`)} */}

                            {/* {(search.trim().toLowerCase().includes(`${user.username}`.toLowerCase())) && */}


                            {(search.trim().toLowerCase() === '' || `${user.username}`.toLowerCase().startsWith(search.trim().toLowerCase())) &&


                                <Card style={{ border: '2px solid grey', cursor: 'pointer' }} onClick={() => {
                                    setPostDetails(user)
                                    navigate('/viewuser')
                                }} >

                                    <Stack direction="row" >

                                        <Avatar src={user.ProfileData?.profilePicture} />

                                        {/* { useremail } !==  { user.email } ? {user.username} : 'null' */}

                                        {user.username}
                                        {<br />}
                                        {user.email}

                                    </Stack>

                                </Card>
                            }

                            {/* search.toLowerCase().includes({user.username}) */}
                            <br />

                        </div>

                    })}

                </Card>

                {/* {setonlyusernames(`${user.username}`)} */}

                {/* {console.log(onlyusernames, "user names list")} */}

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    <IconButton onClick={() => { navigate('/') }} size="large" color="inherit">
                        <HomeIcon />
                    </IconButton>

                    <IconButton onClick={handleShow} size="large" color="inherit">
                        <AddCircleIcon />
                    </IconButton>

                    <IconButton onClick={() => { navigate('/saved') }} size="large" color="inherit">
                        <BookmarkIcon />
                    </IconButton>


                    <IconButton onClick={() => { navigate('/chat') }} size="large" color="inherit">
                        <Badge color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        // onClick={() => { navigate('/notifications') }}
                        size="large"
                        // aria-label=
                        color="inherit"
                        id="basic-button"
                        aria-controls={open2 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? 'true' : undefined}
                        onClick={handleClick2}

                    >

                        <Badge badgeContent={notificationlength.length} color="error">
                            <NotificationsIcon />
                        </Badge>



                    </IconButton>


                    <Menu
                        id="basic-menu"
                        anchorEl={anchorE2}
                        open={open2}
                        onClose={handleClose3}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        // style={{ overflowY: 'scroll',scrollbarColor:'red' }}
                        style={{ overflowY: 'scroll' }}

                    >

                        <MenuItem>

                        </MenuItem>

                        {notifications && notifications.map((n, index) => {
                            return <div key={index} >

                                {n.receiverid?.includes(id) &&

                                    <MenuItem >
                                        {console.log(n.senderName, n.type, "Sender name and typeee")}
                                        {console.log({ n }, "infoooo")}
                                        {/* setcurrentsendername(n?.sendername)
                            setcurrentsendertype(n?.type) */}

                                        {displayNotifications(n?.senderName, n?.type)}
                                    </MenuItem>
                                }

                            </div>

                        }).reverse()
                        }


                        <MenuItem onClick={() => {
                            handleclear()
                        }}>
                            <button>Clear all notifications</button>
                        </MenuItem>

                    </Menu>


                    <IconButton onClick={logout} size="large" color="inherit">
                        <LogoutIcon />
                    </IconButton>

                    <IconButton onClick={() => { navigate('/profile') }}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={profile} />
                        </StyledBadge>
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
            {/* {renderMenu} */}


            <StyledModal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box bgcolor={"background.default"} style={{ overflowY: 'auto' }} color={"text.primary"} width={550} height={600} p={3} borderRadius={5}>

                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography variant='h6' color="grey" textAlign="center">
                            Create new post
                        </Typography>
                        <CloseIcon onClick={handleClose} />
                    </Stack>

                    <UserBox>
                        <Avatar sx={{ width: 30, height: 30 }}></Avatar>
                        <Typography variant='span' fontWeight={500}>
                            Christy
                        </Typography>
                    </UserBox>

                    {/* <img style={{ width: '270px', height: '200px', margin: "10px", marginLeft: '80px' }} name="postpic" src={postpreview} /> */}
                    {url && (
                        // <>
                        //     <p>
                        <img style={{ width: '270px', height: '200px', margin: "10px", marginLeft: '80px' }} src={url} alt="Uploaded image" />
                        // </p>
                        //  <p>{url}</p> 
                        // </>
                    )}

                    <p style={{ color: 'red' }}>{errormsg.url}</p>

                    {/* <form  style={{ marginTop: '-130px' }} onSubmit={handleSubmit} encType='multipart/form-data'> */}
                    <TextField
                        sx={{ width: "100%" }}
                        id="filled-multiline-flexible"
                        label="Caption"
                        value={caption} onChange={(e) => setcaption(e.target.value)} name="caption"
                        multiline
                        maxRows={4}
                        variant="standard"
                    />
                    <p style={{ color: 'red' }}>{errormsg.caption}</p>


                    <TextField
                        sx={{ width: "100%" }}
                        id="filled-multiline-flexible"
                        label="Location"
                        value={location} onChange={(e) => setlocation(e.target.value)} name="location"
                        multiline
                        maxRows={4}
                        variant="standard"
                    />
                    <p style={{ color: 'red' }}>{errormsg.location}</p>

                    <TextField
                        sx={{ width: "100%", margin: "5px" }}
                        id="filled-multiline-static"
                        label="Description"
                        value={description} onChange={(e) => setdescription(e.target.value)} name="description"
                        multiline
                        rows={4}
                        placeholder="Description"
                        variant="standard"
                    />
                    <p style={{ color: 'red' }}>{errormsg.description}</p>

                    <Stack direction="row" gap={40}>
                        {/* <IconButton color="primary" aria-label="upload picture" component="label">
                     
                            <PhotoCamera onClick={() => {
                                
                            }} />
                        </IconButton>

                        <Button type="submit" onClick={handleSubmit} >Post</Button> */}

                        <UploadWidget onUpload={handleOnUpload}>
                            {({ open }) => {
                                function handleOnClick(e) {
                                    e.preventDefault();
                                    open();
                                }
                                return (
                                    <PhotoCamera style={{ cursor: 'progress' }} onClick={handleOnClick} />
                                );
                            }}
                        </UploadWidget>
                        <Button type="submit" onClick={handleSubmit} >Post</Button>


                    </Stack>

                    {/* </form> */}

                </Box>
            </StyledModal>


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                    New post added suceessfully!
                </Alert>
            </Snackbar>

        </AppBar>

        // </Box>
    );
}