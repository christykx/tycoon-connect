import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import Topbar from '../Topbar/Topbar'

import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Alert, Avatar, Box, Modal, Snackbar, Stack, styled, TextField, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Badge from '@mui/material/Badge';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { PhotoCamera } from '@mui/icons-material';
import { makeRequest } from '../../axios';
// import { config } from '../../url';

import EditIcon from '@mui/icons-material/Edit';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';

import { config } from '../../url';
import UploadWidget from '../UploadWidget';


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

})


const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px"
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



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function Profile() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [posts, setposts] = useState([])
    const [savedposts, setsavedposts] = useState([])
    const [likedposts, setlikedposts] = useState([])
    const [mydetails, setmydetails] = useState([])
    const [allusers, setallusers] = useState([])



    const [updatebusinessName, setupdatebusinessName] = useState('')
    const [updateusername, setupdateusername] = useState('')
    const [updatephone, setupdatephone] = useState('')


    const [oldpswd, setoldpswd] = useState('')
    const [newpswd, setnewpswd] = useState('')
    const [cpswd, setcpswd] = useState('')

    const [currentpost, setcurrentpost] = useState('')

    const [profile, setprofile] = useState([])
    const [followings, setfollowings] = useState([])
    const [followers, setfollowers] = useState([])


    const [profileview, setprofileview] = useState('');
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR");


    const [username, setusername] = useState('')
    const [useremail, setuseremail] = useState('')
    const [followingscount, setfollowingscount] = useState('')
    const [followerscount, setfollowerscount] = useState('')
    const [postslength, setpostslength] = useState('')


    const [opening, setOpening] = React.useState(false);
    const [pswdmatch, setpswdmatch] = React.useState(false);
    const [pswdupdated, setpswdupdated] = React.useState(false);

    const [passwordType, setPasswordType] = useState("password");
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const [openedit, setOpenedit] = useState(false);
    const [pswd, setpswd] = useState(false);

    const [allposts, setallposts] = useState([]);

    const [errormsg, seterrormsg] = useState({});


    const [caption, setcaption] = useState('');
    const [location, setlocation] = useState('');
    const [description, setdescription] = useState('');
    const [postpic, setpostpic] = useState('');
    const [postpreview, setpostpreview] = useState('');


    const columns = [
        { field: 'id', headerName: 'S.No', width: 70 },
        { field: 'userName', headerName: 'User Name', width: 130 }

    ];


    const rows = followers.map((follower, index) => ({
        id: index + 1, userName: follower.username
    }));


    const columns1 = [
        { field: 'id', headerName: 'S.No', width: 70 },
        { field: 'userName', headerName: 'User Name', width: 130 }

    ];

    const rows1 = allusers
        .filter(user => followings?.includes(user._id))
        .map((user, index) => {
            return { id: index + 1, userName: user.username };
        });


    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);

    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);

    const handleEdit = () => setOpenedit(true);
    const handleCloseedit = () => setOpenedit(false);
    const handleClosepswd = () => setpswd(false);

    const handlepswd = () => setpswd(true);

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

        setOpening(false);
    };



    const handleClosepswdmatch = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setpswdmatch(false);
    };


    const handleClosepswdupdated = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setpswdupdated(false);
    };


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    // const imageUpload = (e) => {
    //     console.log("aaaaaaa", e.target.files[0]);
    //     setprofile(e.target.files[0])
    //     setprofileview(URL.createObjectURL(e.target.files[0]))
    // }

    // const [issubmit, setissubmit] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(url, "*********************");
        // console.log(postpic.name);
        // console.log(caption);
        // console.log(location);
        // console.log(description);

        const formdata = new FormData();
        formdata.append("profilePicture", url)
        // formdata.append("caption", caption)
        // formdata.append("description", description)
        // formdata.append("location", location)
        formdata.append("userid", id)


        console.log(formdata, "FORMDATAAA");


        makeRequest.post('/users/profile', formdata).then((response) => {

            if (response.status) {
                console.log(response.data, "Dataaaaa");
                console.log(response.status);
                console.log("Hellooooooooo");
                // alert("Post created successfully")
                window.location.reload(false);
                navigate('/profile')
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


    const handleupdate = (e) => {
        e.preventDefault();

        console.log(updatebusinessName);
        console.log(updateusername);
        console.log(updatephone);

        if (updatephone.length > 10) {
            alert('Phone number cannot be more than 10 digits.');
        } else if (updatephone.length != 0 && updatephone.length < 10) {
            alert('Phone number cannot be less than 10 digits.');
        }
        else if (updatephone.length == 0 || updatephone.length == 10) {

            makeRequest.post('/users/updateprofile', {
                updatebusinessName,
                updateusername,
                updatephone,
            }).then((response) => {

                if (response.status) {

                    console.log("REsponse status reached frontend");
                    window.location.reload(false);

                    navigate('/profile')

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


    }



    console.log(currentpost?.post?._id, "CC post id");

    const handleSubmit1 = (e) => {
        e.preventDefault();

        handleClose();

        console.log(url);
        // console.log(postpic.name);
        console.log(caption);
        console.log(location);
        console.log(description);

        let currentTime = new Date()

        makeRequest.post('/users/editpost', {
            curpostid: currentpost?.post?._id,
            postpic: url,
            caption: caption,
            description: description,
            location: location,
            userid: id,
            createdAt: currentTime

        }).then((response) => {

            if (response.status) {

                console.log("REsponse status reached frontend");
                window.location.reload(false);

                navigate('/profile')

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


    const handlepswdupdate = (e) => {
        e.preventDefault();

        console.log(oldpswd);
        console.log(newpswd);
        console.log(cpswd);

        let confirmpswd = mydetails.cpassword;
        console.log(confirmpswd);

        if (oldpswd !== confirmpswd) {
            console.log(" Old Pswd wrong");
            setOpening(true);
        }

        if (newpswd !== cpswd) {
            console.log("pswd doesn't match");
            setpswdmatch(true)
        }


        makeRequest.post('/users/changepswd', {
            password: newpswd,
            cpassword: cpswd
        }).then((response) => {

            if (response.status) {

                console.log("REsponse status reached frontend for pswd");

                // window.location.reload(false);
                setpswdupdated(true)
                navigate('/profile')

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



    const DeletePost = (postid) => {
        console.log(postid, "::::::::Post idddddddddddddddd:::::::::::::");
        // console.log(id, "::::::::((((((((())))))))):::::::::");

        makeRequest.post('/users/deletepost', { postid }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Dataaaaa");
                setposts(response?.data)
                // alert("Post Details kitti")
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



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [openfollowers, setOpenfollowers] = React.useState(false);
    const handlefollowerslist = () => setOpenfollowers(true);
    const handleClosefollowerslist = () => setOpenfollowers(false);


    const [openfollowing, setOpenfollowing] = React.useState(false);
    const handlefollowinglist = () => setOpenfollowing(true);
    const handleClosefollowinglist = () => setOpenfollowing(false);


    useEffect(() => {
        makeRequest.get(`/users/getpost/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                setposts(response?.data)
                setpostslength(response?.data.length)


                console.log("Haiiii");
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


        makeRequest.get(`/users/getsavedpost/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "saved post Dataaaaa");
                setsavedposts(response?.data)

                console.log("Haiiii");
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

        makeRequest.get(`/users/getlikedpost/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Dataaaaa");
                setlikedposts(response?.data)
                console.log("Haiiii");
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.get(`/users/getusername/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Nameeeeeee");
                setusername(response?.data)

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


        makeRequest.get(`/users/getmyaccount/${id}`).then((response) => {

            if (response.status) {
                console.log(response?.data[0], "Got myyyyyyyy dataaaaaaa");
                setmydetails(response?.data[0])
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
                console.log(response?.data, "Get Profile dataaaaaaa");
                setprofile(response?.data)
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.get(`/users/getfollowingslist/${id}`).then((response) => {
            console.log(response, "Get following list");
            if (response.status) {
                console.log(response?.data, "get following people list RESSSSSSS");
                console.log(response?.data.length, "get following people COUNT RESSSSSSS");
                setfollowings(response?.data);
                setfollowingscount(response?.data.length);
            }
            else {
                alert("Something went wrong");
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data);
            console.log("-----errrrr---", err.response.data);
        })


        makeRequest.get(`/users/getfollowerslist/${id}`).then((response) => {
            console.log(response, "Get followers list");
            if (response.status) {
                console.log(response?.data, "get followers people list RESSSSSSS");
                console.log(response?.data.length, "get followers people COUNT RESSSSSSS");
                setfollowers(response?.data);
                setfollowerscount(response?.data.length);
            }
            else {
                alert("Something went wrong");
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data);
            console.log("-----errrrr---", err.response.data);
        })



        makeRequest.get('/users/getallusers').then((response) => {

            console.log(response, "Get user names");
            if (response.status) {
                console.log(response?.data, "Get user dataaaaaaa");
                setallusers(response?.data)
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })



        makeRequest.get('/users/getallposts').then((response) => {
            console.log(response, "Get all posts ");
            if (response.status) {
                console.log(response?.data, "Get all posts dataaaaaaa");
                setallposts(response?.data)
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


    return (
        <Box flex={4} p={2} sx={{ overflow: 'hidden', paddingLeft: '50px' }}  >

            {console.log(profile, "Profileeeeeeeeeeeeeeeeeee")}

            <Stack direction="row" gap={3} flexWrap="wrap">
                <Box>
                    <Stack direction="column" flexWrap="wrap" >

                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={profile} sx={{ width: '200px', height: "200px" }} />
                        </StyledBadge>

                        {/* upload */}
                        <Button onClick={handleShow} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" startIcon={<CameraAltIcon />} component="label">
                            Upload
                            {/* <input onChange={imageUpload} hidden accept="image/*" multiple type="file" /> */}
                        </Button>
                        {/* upload */}

                    </Stack>


                </Box>

                <Box
                    sx={{
                        width: 300,
                        height: 200,
                    }}
                >
                    <Typography variant='h6' sx={{ textAlign: 'center', marginTop: '50px' }}>{username}</Typography>

                    <Typography variant="body2" sx={{ textAlign: 'center' }}>{useremail}</Typography>
                    {/* <Typography variant="body2" sx={{textAlign:'center'}}>BusinessName:Tycoon</Typography> */}


                    <Stack direction="row" justifyContent="space-evenly" sx={{ margin: '20px' }}>
                        <Stack direction="column">
                            <Typography>{postslength}</Typography>
                            <Typography>Posts</Typography>

                        </Stack>
                        <Stack direction="column" style={{ cursor: 'pointer' }} onClick={handlefollowerslist}>
                            <Typography>{followerscount}</Typography>
                            <Typography>Followers</Typography>

                        </Stack>
                        <Stack direction="column" style={{ cursor: 'pointer' }} onClick={handlefollowinglist}>
                            <Typography>{followingscount}</Typography>
                            <Typography> Followings</Typography>
                        </Stack>
                    </Stack>
                </Box>


                <Stack direction="row" flexWrap="wrap">

                    <Button onClick={handleEdit} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" startIcon={<EditIcon />} component="label">
                        Edit Profile
                    </Button>

                    <Button onClick={handlepswd} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" startIcon={<EditIcon />} component="label">
                        Change Password
                    </Button>

                </Stack>

            </Stack>


            <Modal
                open={openedit}
                onClose={handleCloseedit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box bgcolor={"background.default"} color={"text.primary"} sx={{ marginLeft: '75vh' }} width={500} height={500} p={3} borderRadius={5} >
                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            Edit Profile
                        </Typography>
                        <CloseIcon onClick={handleCloseedit} />
                    </Stack>

                    <form style={{ marginTop: '-15px' }}>

                        {/* {mydetails && mydetails.map((details, index) => { */}

                        <div >

                            <input type="text" minLength='5' required name="businessName" placeholder={mydetails.businessName} onChange={(e) => { setupdatebusinessName(e.target.value) }} />

                            <input type="text" minLength='5' placeholder={mydetails.username} required name="username" onChange={(e) => { setupdateusername(e.target.value) }} />

                            <input type="number" name="phone" placeholder={mydetails.phone} required
                                onChange={(e) => {

                                    const phoneValue = e.target.value;
                                    // if (phoneValue.length > 10) {
                                    //     alert('Phone number cannot be more than 10 digits.');
                                    // } else {
                                    setupdatephone(phoneValue);
                                    // }
                                }} />

                            {/* <input type="email" name="email" placeholder={mydetails.email} onChange={(e) => { setupdateemail(e.target.value) }} /> */}

                        </div>

                        {/* })} */}

                        <input type="submit" onClick={handleupdate} style={{ backgroundColor: 'green', color: 'white' }}
                            value="Update" className="submit" />

                    </form>

                </Box>
            </Modal>



            <Modal
                open={pswd}
                onClose={handleClosepswd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box bgcolor={"background.default"} color={"text.primary"} sx={{ marginLeft: '75vh' }} width={500} height={500} p={3} borderRadius={5} >
                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            Change Password
                        </Typography>
                        <CloseIcon onClick={handleClosepswd} />
                    </Stack>

                    <form style={{ marginTop: '-15px' }}>

                        <div >
                            <input type={passwordType} required name="oldpswd" placeholder="Enter your old Password" onChange={(e) => { setoldpswd(e.target.value) }} value={oldpswd} />
                            <Tooltip title="Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers">
                                <input type={passwordType} required placeholder="Enter your new password" name="password" onChange={(e) => { setnewpswd(e.target.value) }} value={newpswd} />
                            </Tooltip>
                            <p>
                                {/* Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers */}
                            </p>
                            <input type={passwordType} required name="cpassword" placeholder="Repeat your new password" onChange={(e) => { setcpswd(e.target.value) }} value={cpswd} />

                        </div>

                        <Stack direction='row' flexWrap='wrap'>

                            <input type="submit" onClick={handlepswdupdate} style={{ backgroundColor: 'green', color: 'white', width: '300px' }}
                                value="Update" className="submit" />

                            <div className="input-group-btn" style={{ marginTop: '15px', paddingLeft: '2px' }}>
                                <button className="btn btn-outline-primary" onClick={togglePassword}>
                                    {passwordType === "password" ? <VisibilityOffIcon></VisibilityOffIcon> : <VisibilityIcon></VisibilityIcon>}
                                </button>
                            </div>
                        </Stack>

                    </form>
                </Box>
            </Modal>


            <StyledModal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box bgcolor={"background.default"} color={"text.primary"} width={500} height={350} p={3} borderRadius={5}>

                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography variant='h6' color="grey" textAlign="center">
                            Upload Profile Picture
                        </Typography>
                        <CloseIcon onClick={handleClose} />
                    </Stack>


                    {url && <img style={{ width: '270px', height: '200px', margin: "10px", marginLeft: '80px' }} name="postpic" src={url} />}

                    <Stack direction="row" gap={40}>
                        {/* <IconButton color="primary" aria-label="upload picture" component="label"> */}
                        {/* <input onChange={imageUpload} hidden accept="image/*" type="file" /> */}
                        {/* </IconButton> */}

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

                        <Button type="submit" onClick={handleSubmit} >Upload</Button>
                    </Stack>

                </Box>
            </StyledModal>




            <StyledModal
                open={show1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box bgcolor={"background.default"} color={"text.primary"} width={550} height={600} p={3} borderRadius={5}>

                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography variant='h6' color="grey" textAlign="center">
                            Update your post
                        </Typography>
                        {console.log(currentpost, "CC post")}
                        <CloseIcon onClick={handleClose1} />
                    </Stack>

                    <UserBox>
                        <Avatar sx={{ width: 30, height: 30 }}></Avatar>
                        {/* <Typography variant='span' fontWeight={500}>
                            Christy
                        </Typography> */}
                    </UserBox>

                    {/* <img style={{ width: '270px', height: '200px', margin: "10px", marginLeft: '80px' }} name="postpic" src={postpreview} /> */}
                    {url ?
                        <img style={{ width: '270px', height: '200px', margin: "10px", marginLeft: '80px' }}
                            src={url}
                            alt="Uploaded image" />

                        :

                        <img style={{ width: '270px', height: '200px', margin: "10px", marginLeft: '80px' }}
                            src={currentpost?.post?.postpic}
                            alt="Uploaded image" />
                    }


                    {/* <form  style={{ marginTop: '-130px' }} onSubmit={handleSubmit} encType='multipart/form-data'> */}

                    {/* <input type="text" minLength='5' required name="businessName" placeholder={mydetails.businessName} onChange={(e) => { setupdatebusinessName(e.target.value) }} /> */}


                    <TextField
                        sx={{ width: "100%" }}
                        // id="filled-multiline-flexible"
                        // label="Caption"
                        placeholder={currentpost?.post?.caption}
                        // value={caption} 
                        onChange={(e) => setcaption(e.target.value)}
                        name="caption"
                        multiline
                        maxRows={4}
                        variant="standard"
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        id="filled-multiline-flexible"
                        // label="Location"
                        placeholder={currentpost?.post?.location}
                        // value={location} 
                        onChange={(e) => setlocation(e.target.value)} name="location"
                        multiline
                        maxRows={4}
                        variant="standard"
                    />
                    <TextField
                        sx={{ width: "100%", margin: "5px" }}
                        id="filled-multiline-static"
                        // label="Description"
                        placeholder={currentpost?.post?.description}
                        // value={description} 
                        onChange={(e) => setdescription(e.target.value)} name="description"
                        multiline
                        rows={4}
                        // placeholder="Description"
                        variant="standard"
                    />
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
                        <Button type="submit" onClick={handleSubmit1} >Post</Button>


                    </Stack>

                    {/* </form> */}

                </Box>
            </StyledModal>



            <Box sx={{ width: '100%', margin: '15px' }}>
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider',float:'right' }}> */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', overflow: 'hidden' }}>

                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Saved Posts" {...a11yProps(1)} />
                        <Tab label="Liked Posts" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    {/* Posts */}

                    <ImageList sx={{ width: 500, height: 450 }} >
                        {/* <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">Posts</ListSubheader>
                        </ImageListItem> */}

                        {posts && posts.map((post, index) => {
                            return <ImageListItem >
                                <img
                                    src={post.postpic}
                                    // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={post.caption}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={post.caption}
                                    subtitle={post.description}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${post.caption}`}
                                        >

                                            <DeleteOutlineIcon onClick={() => { DeletePost(`${post._id}`) }} />
                                            <EditIcon onClick={() => {
                                                { console.log(post, "CUrrent postt"); }
                                                setcurrentpost({ post })
                                                handleShow1(`${post._id}`)
                                            }} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        }).reverse()
                        }
                    </ImageList>

                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    Saved
                </TabPanel> */}


                <TabPanel value={value} index={1}>
                    {/* Posts */}

                    <ImageList sx={{ width: 500, height: 450 }} >

                        {/* <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">Posts</ListSubheader>
                        </ImageListItem> */}

                        {allposts && allposts.map((post, index) => {
                            // return <>
                            //     {savedposts && savedposts.map((spost, index) => {
                            return <>

                                {post.saved?.includes(id) &&
                                    <ImageListItem>
                                        <img
                                            src={post.postpic}
                                            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={post.caption}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={post.caption}
                                            subtitle={post.description}
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    aria-label={`info about ${post.caption}`}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                }
                            </>

                        })
                        }

                        {/* </>
                        })} */}
                    </ImageList>

                </TabPanel>


                <TabPanel value={value} index={2}>
                    {/* Posts */}

                    <ImageList sx={{ width: 500, height: 450 }} >
                        {/* <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">Posts</ListSubheader>
                        </ImageListItem> */}

                        {allposts && allposts.map((post, index) => {
                            // return <>

                            //     {likedposts && likedposts.map((lpost, index) => {

                            return <>

                                {post.liked?.includes(id) &&
                                    <ImageListItem >

                                        <img
                                            src={post.postpic}
                                            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={post.caption}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={post.caption}
                                            subtitle={post.description}
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    aria-label={`info about ${post.caption}`}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                }
                            </>

                        })
                        }

                        {/* </>
                        })} */}
                    </ImageList>

                </TabPanel>

            </Box>


            <Snackbar open={opening} autoHideDuration={6000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="error" sx={{ width: '100%', color: 'red' }} >
                    Entered Old password is wrong !!
                </Alert>
            </Snackbar>


            <Snackbar open={pswdmatch} autoHideDuration={6000} onClose={handleClosepswdmatch} >
                <Alert onClose={handleClosepswdmatch} severity="error" sx={{ width: '100%', color: 'red' }} >
                    Password doesn't match !!
                </Alert>
            </Snackbar>


            <Snackbar open={pswdupdated} autoHideDuration={6000} onClose={handleClosepswdupdated} >
                <Alert onClose={handleClosepswdupdated} severity="success" sx={{ width: '100%', color: 'green' }} >
                    Password Updated successfully !!
                </Alert>
            </Snackbar>


            <Modal
                open={openfollowers}
                onClose={handleClosefollowerslist}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            Followers List
                        </Typography>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClosefollowerslist} />
                    </Stack>

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}

                        />
                    </div>

                </Box>
            </Modal>


            <Modal
                open={openfollowing}
                onClose={handleClosefollowinglist}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            Following List
                        </Typography>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClosefollowinglist} />
                    </Stack>


                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows1}
                            columns={columns1}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>

                </Box>
            </Modal>

        </Box>

    )
}


export default Profile
