import { Avatar, Box, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Switch, Tooltip, styled, Typography, TextField, IconButton } from '@mui/material'
// import InboxIcon from '@mui/icons-material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Add, Light, PhotoCamera } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Badge from '@mui/material/Badge';
import { makeRequest } from '../../axios';
import { config } from '../../url';
import UploadWidget from '../UploadWidget';


// const cloudinaryCore = new Cloudinary({
//     cloud_name: 'tycoonconnect',
//     api_key: '466288529493759',
//     api_secret: '6CTTMKbiz0LySkCyEoZQUBkfyCg',
// });


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


function LeftSidebar({ mode, setMode }) {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("user")
        window.location.reload(false);
        navigate('/login')
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [caption, setcaption] = useState('');
    const [location, setlocation] = useState('');
    const [description, setdescription] = useState('');
    const [postpic, setpostpic] = useState('');
    const [postpreview, setpostpreview] = useState('');

    const [errormsg, seterrormsg] = useState({});


    const [open, setOpen] = React.useState(false);


    const [posts, setposts] = useState([])
    const [profile, setprofile] = useState([])
    const [profileview, setprofileview] = useState('');
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


    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR");

    const [username, setusername] = useState('')

    const [selectedFile, setSelectedFile] = useState(null);


    const [issubmit, setissubmit] = useState(false);


    // const cloudinaryRef = useRef();
    // const widgetRef = useRef();

    // useEffect(() => {
    //     cloudinaryRef.current = window.cloudinary;

    //     widgetRef.current = cloudinaryRef.current.createUploadWidget({
    //         cloudName: 'tycoonconnect',
    //         uploadPreset: 'imagefolder'
    //     }, function (error, result) {
    //         if (result) {
    //             console.log(result, "Result");
    //             imageUpload(result)
    //         } else {
    //             console.log(error, "error");
    //         }

    //     });

    //     console.log(cloudinaryRef.current);
    // }, [])




    // console.log(profilepic.name,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");



    // const imageUpload = (e, result) => {
    //     console.log("aaaaaaa", result?.info?.secure_url);
    //     // setpostpic(e.target.files[0])
    //     // setpostpreview(URL.createObjectURL(e.target.files[0]))
    // }




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


    useEffect(() => {


        makeRequest.get(`/users/getusername/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response.data, "Dataaaaa");
                setusername(response.data)

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


        makeRequest.get(`/users/getprofile/${id}`).then((response) => {

            console.log(response, "Get Profile");
            if (response.status) {
                console.log(response.data, "Get Profile dataaaaaaa");
                setprofile(response.data)

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

        <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }} >
            <Box position="fixed" style={{ border: '2px solid grey', borderRadius: '40px' }}>

                <List>
                    <ListItem onClick={() => { navigate('/profile') }} disablePadding sx={{ margin: '10px' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar src={profile} sx={{ bgcolor: "grey" }} aria-label="recipe" />
                                </StyledBadge>

                            </ListItemIcon>
                            <ListItemText primary={username} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => { navigate('/') }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon style={{ color: '#1ed696' }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => { navigate('/chat') }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ChatIcon style={{ color: '#e6e622' }} />
                            </ListItemIcon>
                            <ListItemText primary="Messages" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => { navigate('/notifications') }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <NotificationsIcon style={{ color: '#2aa7eb' }} />
                            </ListItemIcon>
                            <ListItemText primary="Notifications" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding onClick={() => { navigate('/saved') }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <BookmarkIcon style={{ color: '#d13087' }} />
                            </ListItemIcon>
                            <ListItemText primary="Saved" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem onClick={logout} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon style={{ color: 'red' }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>

                            <ListItemIcon>
                                <DarkModeIcon />
                            </ListItemIcon>

                            <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />

                            {/* <ListItemText primary="Dark Mode" /> */}
                        </ListItemButton>
                    </ListItem>

                    <ListItem onClick={handleShow} style={{ marginLeft: '35px', marginTop: '10px' }}>
                        <Tooltip title="Add new post">
                            <Fab color='primary' aria-label='add'>
                                <Add />
                            </Fab>
                        </Tooltip>
                    </ListItem>

                </List>

            </Box>


            {/* <Button onClick={handleShow}>Open modal</Button> */}
            <StyledModal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
               
                <Box bgcolor={"background.default"}  style={{  overflowY: 'auto'}}  color={"text.primary"} width={550} height={600} p={3} borderRadius={5}>

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

        </Box >

    )
}

export default LeftSidebar
