import { Box, Button, Checkbox, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Stack, TextareaAutosize, TextField, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVert from '@mui/icons-material/MoreVert';
import Favorite from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import EditIcon from '@mui/icons-material/Edit';

import './Banner.css'

import InfiniteScroll from 'react-infinite-scroll-component';

import DeleteIcon from '@mui/icons-material/Delete';


import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import CloseIcon from '@mui/icons-material/Close';


// import BookmarkIcon from '@mui/icons-material/Bookmark';

// import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { AuthContext } from '../../authContext/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Badge from '@mui/material/Badge';
import { PostInfoContext } from '../../store/PostInfoContext';
import { makeRequest } from '../../axios';
import { config } from '../../url';

import { format } from "timeago.js"
import { io } from 'socket.io-client';
import Topbar from '../Topbar/Topbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));






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




function Banner({ socket }) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR");

    const [posts, setposts] = useState([])
    const [usernames, setusernames] = useState([])

    const [followingposts, setfollowingposts] = useState([])

    const [savedposts, setsavedposts] = useState([])

    const [username, setusername] = useState('')

    const [mydetails, setmydetails] = useState([])

    const [newcomment, setnewcomment] = useState([])
    const [getcomment, setgetcomment] = useState([])

    const [newreport, setnewreport] = useState('')
    const [otherpostid, setotherpostid] = useState('')
    const [getreceivername, setgetreceivername] = useState('')

    const [cmtuserid, setcmtuserid] = useState('')


    const [notificationlength, setnotificationlength] = useState([])

    const [notifications, setnotifications] = useState([])

    // const [isLiked, setIsLiked] = useState(false)

    const [loading, setloading] = useState(false);
    

    const [openedit, setOpenedit] = useState(false);
    const [openreport, setopenreport] = useState(false);
    const [openupdatecomment, setopenupdatecomment] = useState(false);
    const [currentcomment, setcurrentcomment] = useState('')

    const handleucomments = () => {
        setopenupdatecomment(true)
    }

    const handleupdatecomment = (e) => {
        e.preventDefault();
        // handleCloseucmt();
        console.log(newcomment, "new comment");
        let currentTime = new Date()

        makeRequest.post('/users/editcomment', {
            curcmtid: currentcomment?.cmt?._id,
            comment: newcomment,
            createdAt: currentTime

        }).then((response) => {

            if (response.status) {

                console.log("REsponse status reached frontend");

                handleCloseucmt();
                setnewcomment("")
                makeRequest.get('/users/getcomment').then((response) => {

                    console.log(response, "getting comment RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "getting comment Dataaaaa");
                        setgetcomment(response?.data)

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

    const handlereports = (postid) => {
        setopenreport(true)
        console.log(postid, "HEre post id is correctttt");
    };

    { console.log(otherpostid, "coreect post id stored inside state"); }

    const handleEdit = () => setOpenedit(true);
    const handleCloseedit = () => setOpenedit(false);
    const handleClosereport = () => setopenreport(false);
    const handleCloseucmt = () => setopenupdatecomment(false);


    const [profile, setprofile] = useState([])
    const [profileview, setprofileview] = useState('');

    const [cmtuserdetails, setcmtuserdetails] = useState('');


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);


    // const [onlineusers, setonlineusers] = useState([])

    // const socket = useRef()


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open2 = Boolean(anchorE2);
    const handleClick2 = (postid) => {
        { console.log(postid, "POStid in handle click22"); }
        setotherpostid(postid)

    };

    const [open3, setOpen3] = React.useState(false);


    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };


    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen3(false);
    };



    // const { postInfo } = useContext(PostInfoContext)
    // useEffect(() => {

    //     //   const { } = postInfo
    //     console.log("Post info reached in banner page");
    //     console.log(postInfo);

    // }, [])


    const [copied, setCopied] = useState(false);

    const handleCopyLink = (postpicid) => {
        console.log(postpicid, "post picture iddd");
        const link = `${postpicid}`;

        navigator.clipboard.writeText(link)
            .then(() => {
                setCopied(true);
                setOpen3(true);

            })
            .catch((err) => {
                console.error('Failed to copy link: ', err);
            });

    }



    useEffect(() => {

        socket?.on("getNotification", (data) => {
            setnotifications((prev) => [...prev, data])
        })

    }, [socket])

    console.log(notifications, "Notificationssss");




    const handlecomment = (postid, postuserid, type) => {
        // e.preventDefault();
        console.log(postid, ":::::::::::::::::::::");
        console.log(id, "::::::::((((((((())))))))):::::::::");
        console.log(postuserid, "::::::::post user idddddddddd:::::::::");
        console.log(mydetails.username, "sender username");

        console.log(type, ":::::::typee:::::::::");

        console.log(newcomment, "New comment..");
        let currentTime = new Date()

        console.log(socket, "checking socket");
        socket?.emit("sendNotification", {
            senderid: id,
            senderName: mydetails.username,
            receiverid: postuserid,
            type,

        })



        makeRequest.post('/users/notificationspost', {
            senderid: id,
            senderName: mydetails.username,
            receiverid: postuserid,
            type,
        }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Notification Dataaaaa");

                // makeRequest.get(`/users/getnotificationlength/${id}`).then((response) => {

                //     console.log(response, "Get notification length");
                //     if (response.status) {
                //         console.log(response?.data, "Get notification length");

                //         setnotificationlength(response?.data)

                //     }
                //     else {
                //         alert("Something went wrong")
                //     }
                // }).catch((err) => {
                //     console.log(err);
                //     alert(err.response.data)
                //     console.log("-----errrrr---", err.response.data);
                // })

            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })




        makeRequest.post('/users/addcomment', {
            postid,
            userid: id,
            senderName: mydetails.username,
            senderDp: mydetails.ProfileData.profilePicture,
            comment: newcomment,
            createdAt: currentTime
        }).then((response) => {

            console.log(response, "Comment RESSSSSSS");
            if (response.status) {
                console.log(response?.data, " comment Dataaaaa");

                setnewcomment("")
                makeRequest.get('/users/getcomment').then((response) => {

                    console.log(response, "getting comment RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "getting comment Dataaaaa");
                        setgetcomment(response?.data)

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



                // setposts(response?.data)

                // window.location.reload(false);
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


    }


    // const handleloadmore = () => {
    //     console.log("Handle load more");
    //     setloading(true)
    // }



    window.addEventListener('scroll', function () {
        console.log("Reached listener");
        var pageHeight = document.documentElement.scrollHeight;
        console.log(pageHeight);

        var scrollPosition = window.scrollY;
        console.log(scrollPosition);

        // console.log(scrollPosition + window.innerHeight+2)
        // console.log(pageHeight);

        if (scrollPosition + window.innerHeight + 2 >= pageHeight) {
            console.log(scrollPosition + window.innerHeight + 2)
            console.log(pageHeight);

            console.log("reached end");

            // let loader = document.getElementById("loader");
            // loader.style.display = "block";

            setTimeout(function () {
                setloading(true)
            }, 300);


        } else {
            console.log("Not greater");
        }
    });


    const handlesave = (postid) => {
        console.log(postid, ":::::::::::::::::::::");
        console.log(id, "::::::::((((((((())))))))):::::::::");


        makeRequest.post('/users/savepost', { postid, userid: id }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                // console.log(response?.data, "Dataaaaa");
                // setposts(response?.data)

                // console.log("Haiiii");
                // // alert("Post Details kitti")
                // window.location.reload(false);
                // navigate('/')

                makeRequest.get(`/users/getfollowingpost/${id}`).then((response) => {

                    console.log(response, " get following post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get  following post Dataaaaa");
                        setfollowingposts(response?.data)

                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })


                makeRequest.get(`/users/getpost/${id}`).then((response) => {

                    console.log(response, " get post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get post Dataaaaa");
                        setposts(response?.data)

                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })


            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }


    const handleunsave = (postid) => {
        console.log(postid, ":::::::::::::::::::::");
        console.log(id, "::::::::((((((((())))))))):::::::::");


        makeRequest.post('/users/unsavepost', { postid, userid: id }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                // console.log(response?.data, "Dataaaaa");
                // setposts(response?.data)

                // console.log("Haiiii");
                // // alert("Post Details kitti")
                // window.location.reload(false);
                // navigate('/')

                makeRequest.get(`/users/getfollowingpost/${id}`).then((response) => {

                    console.log(response, " get following post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get  following post Dataaaaa");
                        setfollowingposts(response?.data)

                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })



                makeRequest.get(`/users/getpost/${id}`).then((response) => {

                    console.log(response, " get post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get post Dataaaaa");
                        setposts(response?.data)
                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })

            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }


    const handlelike = (postid, postuserid, type) => {
        console.log(postid, ":::::::::::::::::::::");
        console.log(postuserid, "::::::::::posts user id:::::::::::");
        console.log(mydetails.username, "::::::::::user name:::::::::::");

        makeRequest.get(`/users/getreceivername/${postuserid}`).then((response) => {
            if (response.status) {
                console.log(response?.data, " get receiver name");
                setgetreceivername(response?.data)
            }
            else {
                console.log("Something went wrong")
            }


        }).catch((err) => {
            console.log(err);
        })


        socket?.emit("sendNotification", {
            senderid: id,
            senderName: mydetails.username,
            receiverid: postuserid,
            type,
        })

        makeRequest.post('/users/notificationspost', {
            senderid: id,
            senderName: mydetails.username,
            receiverid: postuserid,
            type,
        }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Notification Dataaaaa");

                // makeRequest.get(`/users/getnotificationlength/${id}`).then((response) => {

                //     console.log(response, "Get notification length");
                //     if (response.status) {
                //         console.log(response?.data, "Get notification length");

                //         setnotificationlength(response?.data)

                //     }
                //     else {
                //         alert("Something went wrong")
                //     }
                // }).catch((err) => {
                //     console.log(err);
                //     alert(err.response.data)
                //     console.log("-----errrrr---", err.response.data);

                // })

            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.post('/users/likepost', { postid, userid: id }).then((response) => {

            console.log(response, "liked RESSSSSSS");
            if (response.status) {
                console.log(response?.data, " likedddd Dataaaaa");
                // setposts(response?.data)

                // console.log("Haiiii");
                // alert("Post Details kitti")
                // window.location.reload(false);
                // navigate('/')
                makeRequest.get(`/users/getfollowingpost/${id}`).then((response) => {

                    console.log(response, " get following post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get  following post Dataaaaa");
                        setfollowingposts(response?.data)

                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })


                makeRequest.get(`/users/getpost/${id}`).then((response) => {

                    console.log(response, " get post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get post Dataaaaa");
                        setposts(response?.data)

                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })


            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }


    const handleunlike = (postid) => {
        console.log(postid, ":::::::::::::::::::::");



        makeRequest.post('/users/unlikepost', { postid, userid: id }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Dataaaaa");
                // setposts(response?.data)

                // console.log("Haiiii");
                // // alert("Post Details kitti")
                // window.location.reload(false);
                // navigate('/')

                makeRequest.get(`/users/getfollowingpost/${id}`).then((response) => {

                    console.log(response, " get following post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get  following post Dataaaaa");
                        setfollowingposts(response?.data)

                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })



                makeRequest.get(`/users/getpost/${id}`).then((response) => {

                    console.log(response, " get post RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "get post Dataaaaa");
                        setposts(response?.data)
                        console.log("Haiiii");
                        // alert("Post Details kitti")
                        // window.location.reload(false);
                        // navigate('/')
                    }
                    else {
                        alert("Something went wrong")
                    }
                }, { withCredentials: true }).catch((err) => {
                    console.log(err);
                    alert(err.response.data)
                    console.log("-----errrrr---", err.response.data);

                })




            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }


    const handlereport = (postid) => {
        console.log(postid, ":::::::::::POST IDDD::::::::::");
        console.log(newreport, ":::::::::::::NEW REPORT::::::::");


        makeRequest.post('/users/reportpost', { postid, username, userid: id, text: newreport }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Dataaaaa");
                setposts(response?.data)

                console.log("Haiiii");
                // alert("Post Details kitti")
                window.location.reload(false);
                navigate('/')
            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }


    useEffect(() => {



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



        makeRequest.get(`/users/getmyaccount/${id}`).then((response) => {

            console.log(response, "Get user names");
            if (response.status) {
                console.log(response?.data, "Get user dataaaaaaa");
                setmydetails(response?.data[0])

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






        makeRequest.get(`/users/getfollowingpost/${id}`).then((response) => {

            console.log(response, " get following post RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "get  following post Dataaaaa");
                setfollowingposts(response?.data)

                console.log("Haiiii");
                // alert("Post Details kitti")
                // window.location.reload(false);
                // navigate('/')
            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.get(`/users/getusername/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response.data, "usernamee##########");
                setusername(response.data)

                console.log("Haiiii");
                // alert("Post Details kitti")
                // navigate('/')
            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.get(`/users/getsavedpost/${id}`).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Dataaaaa");
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
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })

    }, [])



    useEffect(() => {

        makeRequest.get(`/users/getpost/${id}`).then((response) => {

            console.log(response, " get post RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "get post Dataaaaa");
                setposts(response?.data)
                console.log("Haiiii");
                // alert("Post Details kitti")
                // window.location.reload(false);
                // navigate('/')
            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }, [])


    useEffect(() => {

        makeRequest.get('/users/getcomment').then((response) => {

            console.log(response, "getting comment RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "getting comment Dataaaaa");
                setgetcomment(response?.data)

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

    }, [])



    const deletecomment = (cmtid) => {
        console.log(cmtid, "::::::::cmt idddddddddddddddd:::::::::::::");

        makeRequest.post('/users/deletecmt', { cmtid }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Dataaaaa");
                // setposts(response?.data)
                // window.location.reload(false);
                // navigate('/')

                makeRequest.get('/users/getcomment').then((response) => {

                    console.log(response, "getting comment RESSSSSSS");
                    if (response.status) {
                        console.log(response?.data, "getting comment Dataaaaa");
                        setgetcomment(response?.data)

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




    return (
        <Box flex={4} p={2} >


            {copied &&
                <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
                    <Alert onClose={handleClose3} severity="success" sx={{ width: '100%' }}>
                        Link Copied!
                    </Alert>
                </Snackbar>
            }


            <Box flex={4} p={2} sx={{ marginTop: '-50px' }}>

                {posts && posts.map((post, index) => {


                    return <div key={index}>

                        {post.userid?.includes(id) &&

                            <Card sx={{ margin: 5, border: '1px solid grey', borderRadius: '15px' }}>

                                <CardHeader
                                    avatar={
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar sx={{ bgcolor: "purple" }} alt="Christy" src={profile} />
                                        </StyledBadge>

                                    }

                                    action={
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <MoreVert />
                                        </Button>
                                    }

                                    title={username}
                                    subheader={post.location}


                                />

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >

                                    <MenuItem onClick={() => { handleCopyLink(post.postpic) }}>Copy link</MenuItem>

                                </Menu>

                                <CardMedia
                                    component="img"
                                    height="300"
                                    src={post.postpic}
                                    alt="Post"
                                />
                                <Stack direction="row" justifyContent="space-between">
                                    <CardContent>
                                        <Typography variant="body1" fontWeight={800} color="text.secondary">
                                            {post.caption}<br />
                                            {/* {post._id} */}
                                        </Typography>
                                        {/* </CardContent>
                    <CardContent> */}
                                        <Typography variant="body2" color="text.secondary">
                                            {post.description}
                                        </Typography>
                                    </CardContent>

                                    <p>{format(post?.createdAt)}  </p>

                                </Stack>



                                <CardActions disableSpacing>
                                    {/* <IconButton aria-label="add to favorites"  onClick={likedpic} > */}



                                    <IconButton>
                                        <p>{post?.liked?.length} likes</p>
                                    </IconButton>

                                    <IconButton aria-label="add to favorites">
                                        {post.liked?.includes(id) ?
                                            <Favorite style={{ color: 'red' }} onClick={() => {
                                                handleunlike(`${post._id}`)
                                            }} /> :
                                            <FavoriteBorder style={{ color: 'red' }} onClick={() => {
                                                handlelike(`${post._id}`, post.userid, 1)
                                            }} />
                                        }
                                    </IconButton>

                                    <IconButton>

                                        {post.saved?.includes(id) ?
                                            <BookmarkIcon onClick={() => { handleunsave(`${post._id}`) }} style={{ color: '#d13087' }} /> :
                                            <BookmarkBorderIcon onClick={() => { handlesave(`${post._id}`) }} style={{ color: '#d13087' }} />
                                        }

                                    </IconButton>

                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <Typography paragraph>Comments</Typography>
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>


                                <Collapse in={expanded} timeout="auto" unmountOnExit>

                                    <CardContent>
                                        {/* <Typography paragraph>Comments</Typography> */}

                                        {getcomment && getcomment.map((cmt, index) => {

                                            return <div key={index} >
                                                {(cmt.postid.includes(post._id)) &&
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                        <Stack direction='row' gap={1}>
                                                            <Avatar src={cmt?.senderDp} sx={{ bgcolor: "grey" }} aria-label="recipe" />
                                                            <h6>{cmt?.senderName}</h6>
                                                        </Stack>

                                                        <Typography paragraph>
                                                            {cmt.comment}
                                                        </Typography>
                                                        <Typography paragraph style={{ color: 'grey' }}>
                                                            {format(cmt.createdAt)}
                                                        </Typography>

                                                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { deletecomment(cmt._id) }} />

                                                        {(cmt.userid.includes(id)) &&
                                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => {
                                                                setcurrentcomment({ cmt })
                                                                handleucomments()
                                                            }} />
                                                        }

                                                    </div>
                                                }

                                            </div>

                                        }).reverse()
                                        }

                                    </CardContent>

                                </Collapse>

                                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>

                                    <TextareaAutosize style={{ width: '80%', height: '40px' }} name='comment' onChange={(e) => { setnewcomment(e.target.value) }} value={newcomment} placeholder="Add a comment..." />

                                    <button style={{ border: '1px solid green', backgroundColor: 'green', color: 'white', borderRadius: '4px' }} onClick={() => { handlecomment(`${post._id}`, post.userid, 2) }}>
                                        Post
                                    </button>

                                </div>

                                {console.log(newcomment)}

                            </Card>
                        }


                    </div>

                }).reverse().slice(0, 5)
                }

            </Box >



            <Box flex={4} p={2} sx={{ marginTop: '-30px' }} >

                {followingposts && followingposts?.map((user, index) => {


                    console.log(user, "HERE IS YOUR USER in banner page");

                    return <div key={index}>


                        {user && user.followingdetails?.map((post, index) => {


                            return <Card key={index} sx={{ margin: 5, borderRadius: '15px' }}>

                                {console.log(user.following, "ooooooooooooo in banner")}
                                {console.log(post.userid, "useriddddd in banner")}

                                {/* {(user.following?.includes(post.userid)) ? */}

                                {/* <> */}
                                {console.log(post, "Correct in bannerr")}


                                {usernames && usernames?.map((usernamee, index) => {
                                    return <div key={index}>

                                        {console.log(usernamee, "Got user full detailsssssss in banner")}

                                        {(post.userid?.includes(usernamee?._id)) &&
                                            <>
                                                <CardHeader
                                                    avatar={
                                                        <StyledBadge
                                                            overlap="circular"
                                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                            variant="dot"
                                                        >
                                                            <Avatar sx={{ bgcolor: "purple" }} alt="Christy" src={usernamee.ProfileData.profilePicture} />
                                                        </StyledBadge>

                                                    }
                                                    action={
                                                        <Button
                                                            id="basic-button"
                                                            aria-controls={open2 ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open2 ? 'true' : undefined}
                                                            onClick={(event) => {
                                                                console.log(post._id, "POStid inside onclick handleclick2");
                                                                setAnchorE2(event.currentTarget);

                                                                handleClick2(post._id)
                                                            }}
                                                        >
                                                            <MoreVert />
                                                        </Button>
                                                    }

                                                    //{(post.userid?.includes(usernamee._id)) &&
                                                    // <>
                                                    title={usernamee.username}
                                                    // </>
                                                    // }
                                                    subheader={post.location}

                                                />

                                                <CardMedia
                                                    component="img"
                                                    height="300"
                                                    // image="https://www.wgu.edu/content/dam/web-sites/blog-newsroom/blog/images/national/2018/october/business-agreement.jpg"
                                                    src={post.postpic}
                                                    alt="Post"
                                                />

                                                <Stack direction="row" justifyContent="space-between">

                                                    <CardContent>
                                                        <Typography variant="body1" fontWeight={800} color="text.secondary">
                                                            {post.caption}<br />
                                                            {/* {post._id} */}
                                                        </Typography>
                                                        {/* </CardContent>
<CardContent> */}
                                                        <Typography variant="body2" color="text.secondary">
                                                            {post.description}
                                                        </Typography>
                                                    </CardContent>

                                                    <p>{format(post?.createdAt)}  </p>

                                                </Stack>


                                                <CardActions disableSpacing>
                                                    {/* <IconButton aria-label="add to favorites"  onClick={likedpic} > */}
                                                    <IconButton>
                                                        <p>{post?.liked?.length} likes</p>
                                                    </IconButton>


                                                    <IconButton aria-label="add to favorites">

                                                        {/* <FavoriteIcon /> */}
                                                        {/* <Checkbox icon={<FavoriteBorder style={{ color: 'red' }} />}
        checkedIcon={<Favorite style={{ color: 'red' }} />}
    /> */}

                                                        {post.liked?.includes(id) ?
                                                            <Favorite style={{ color: 'red' }} onClick={() => { handleunlike(`${post._id}`) }} /> :
                                                            <FavoriteBorder style={{ color: 'red' }} onClick={() => { handlelike(`${post._id}`, post.userid, 1) }} />
                                                        }

                                                    </IconButton>


                                                    <IconButton>


                                                        {post.saved?.includes(id) ?
                                                            <BookmarkIcon onClick={() => { handleunsave(`${post._id}`) }} style={{ color: '#d13087' }} /> :
                                                            <BookmarkBorderIcon onClick={() => { handlesave(`${post._id}`) }} style={{ color: '#d13087' }} />
                                                        }

                                                    </IconButton>

                                                    <ExpandMore
                                                        expand={expanded}
                                                        onClick={handleExpandClick}
                                                        aria-expanded={expanded}
                                                        aria-label="show more"
                                                    >
                                                        <Typography paragraph>Comments</Typography>
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                                </CardActions>


                                                <Collapse in={expanded} timeout="auto" unmountOnExit>

                                                    {getcomment && getcomment.map((cmt, index) => {

                                                        return <div key={index}  >
                                                            {(cmt.postid.includes(post._id)) &&
                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                                    {/* {cmt.userid} */}

                                                                    <Stack direction='row' gap={1}>
                                                                        <Avatar src={cmt?.senderDp} sx={{ bgcolor: "grey" }} aria-label="recipe" />
                                                                        <h6>{cmt?.senderName}</h6>
                                                                    </Stack>

                                                                    <Typography paragraph>
                                                                        {cmt.comment}
                                                                    </Typography>
                                                                    <Typography paragraph style={{ color: 'grey' }}>
                                                                        {format(cmt.createdAt)}
                                                                    </Typography>

                                                                    {(cmt.userid.includes(id)) &&
                                                                        <>
                                                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { deletecomment(cmt._id) }} />
                                                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => {
                                                                                setcurrentcomment({ cmt })
                                                                                handleucomments()
                                                                            }} />
                                                                        </>
                                                                    }

                                                                </div>
                                                            }
                                                        </div>

                                                    }).reverse()
                                                    }

                                                </Collapse>

                                                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>


                                                    <TextareaAutosize style={{ width: '80%', height: '40px' }} name='comment' onChange={(e) => { setnewcomment(e.target.value) }} value={newcomment} placeholder="Add a comment..." />
                                                    <button style={{ border: '1px solid green', backgroundColor: 'green', color: 'white', borderRadius: '4px' }} onClick={() => { handlecomment(`${post._id}`, post.userid, 2) }}>
                                                        {/* <FavoriteBorder style={{ color: 'red' }} onClick={() => { handlelike(`${post._id}`, post.userid, 1) }} /> */}

                                                        Post
                                                    </button>
                                                    {/* <Button >Post</Button> */}

                                                </div>


                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorE2}
                                                    open={open2}
                                                    onClose={handleClose2}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={() => {
                                                        console.log(otherpostid, "Post id when clicking the option");
                                                        handlereports(otherpostid)
                                                    }} >

                                                        <ListItemText>Report</ListItemText>
                                                        <ListItemIcon>
                                                            <ReportProblemIcon style={{ color: 'orange' }} />
                                                            {/* <ReportProblemIcon style={{ color: 'orange' }} onClick={() => { handlereport(`${post._id}`) }} /> */}
                                                        </ListItemIcon>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => { handleCopyLink(post.postpic) }}>Copy link</MenuItem>

                                                    {/* <MenuItem onClick={handleCopyLink}>Copy link</MenuItem> */}

                                                </Menu>


                                                <Modal
                                                    open={openreport}
                                                    onClose={handleClosereport}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >

                                                    <Box bgcolor={"background.default"} color={"text.primary"} sx={{ marginLeft: '65vh' }} width={500} height={400} p={3} borderRadius={5} >
                                                        <Stack direction="row" justifyContent="space-between" gap={10}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" >
                                                                Submit Your Report
                                                            </Typography>
                                                            <CloseIcon onClick={handleClosereport} />

                                                        </Stack>

                                                        <form style={{ marginTop: '-15px' }}>

                                                            <div >

                                                                <Tooltip title="Write a problem you are facing">
                                                                    <textarea style={{ borderRadius: '5px', width: '300px' }} type='text' required name="report" placeholder="Write your issue...." onChange={(e) => { setnewreport(e.target.value) }} value={newreport} />
                                                                </Tooltip>

                                                                <p>  </p>

                                                            </div>

                                                            <input className="submit" type="submit" style={{ backgroundColor: 'green', color: 'white', width: '300px' }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handlereport(otherpostid)
                                                                }} />
                                                        </form>
                                                    </Box>
                                                </Modal>

                                            </>
                                        }

                                    </div>

                                })}

                            </Card>

                        }).slice(0, 5)
                        }

                    </div>

                }).reverse()
                }

            </Box>




            {
                loading ?
                    <>
                        {/* <p>Loading...</p> */}

                        {/* <div className="loader"></div> */}
                        {/* <div className="loader" id="loader" style={{display:"none"}}></div> */}


                        <Box flex={4} p={2} sx={{ marginTop: '-50px' }}>

                            {posts && posts.map((post, index) => {


                                return <div key={index}>

                                    {post.userid?.includes(id) &&

                                        <Card sx={{ margin: 5, border: '1px solid grey', borderRadius: '15px' }}>


                                            <CardHeader
                                                avatar={
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        variant="dot"
                                                    >
                                                        <Avatar sx={{ bgcolor: "purple" }} alt="Christy" src={profile} />
                                                    </StyledBadge>

                                                }

                                                action={
                                                    <Button
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <MoreVert />
                                                    </Button>
                                                }

                                                title={username}
                                                subheader={post.location}


                                            />

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >

                                                <MenuItem onClick={handleClose}>Copy link</MenuItem>

                                            </Menu>

                                            <CardMedia
                                                component="img"
                                                height="300"
                                                src={post.postpic}
                                                alt="Post"
                                            />

                                            <Stack direction="row" justifyContent="space-between">

                                                <CardContent>
                                                    <Typography variant="body1" fontWeight={800} color="text.secondary">
                                                        {post.caption}<br />
                                                        {/* {post._id} */}
                                                    </Typography>
                                                    {/* </CardContent>
    <CardContent> */}
                                                    <Typography variant="body2" color="text.secondary">
                                                        {post.description}
                                                    </Typography>
                                                </CardContent>

                                                <p>{format(post?.createdAt)}  </p>

                                            </Stack>


                                            <CardActions disableSpacing>
                                                {/* <IconButton aria-label="add to favorites"  onClick={likedpic} > */}


                                                <IconButton>
                                                    <p>{post?.liked?.length} likes</p>
                                                </IconButton>


                                                <IconButton aria-label="add to favorites">

                                                    {post.liked?.includes(id) ?
                                                        <Favorite style={{ color: 'red' }} onClick={() => { handleunlike(`${post._id}`) }} /> :
                                                        <FavoriteBorder style={{ color: 'red' }} onClick={() => { handlelike(`${post._id}`, post.userid, 1) }} />
                                                    }

                                                </IconButton>

                                                <IconButton>

                                                    {post.saved?.includes(id) ?
                                                        <BookmarkIcon onClick={() => { handleunsave(`${post._id}`) }} style={{ color: '#d13087' }} /> :
                                                        <BookmarkBorderIcon onClick={() => { handlesave(`${post._id}`) }} style={{ color: '#d13087' }} />
                                                    }

                                                </IconButton>

                                                <ExpandMore
                                                    expand={expanded}
                                                    onClick={handleExpandClick}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <Typography paragraph>Comments</Typography>
                                                    <ExpandMoreIcon />
                                                </ExpandMore>
                                            </CardActions>


                                            <Collapse in={expanded} timeout="auto" unmountOnExit>

                                                <CardContent>
                                                    {/* <Typography paragraph>Comments</Typography> */}

                                                    {getcomment && getcomment.map((cmt, index) => {

                                                        return <div key={index} >
                                                            {(cmt.postid.includes(post._id)) &&
                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                                    <Stack direction='row' gap={1}>
                                                                        <Avatar src={cmt?.senderDp} sx={{ bgcolor: "grey" }} aria-label="recipe" />
                                                                        <h6>{cmt?.senderName}</h6>
                                                                    </Stack>

                                                                    <Typography paragraph>
                                                                        {cmt.comment}
                                                                    </Typography>
                                                                    <Typography paragraph style={{ color: 'grey' }}>
                                                                        {format(cmt.createdAt)}
                                                                    </Typography>

                                                                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { deletecomment(cmt._id) }} />
                                                                    {(cmt.userid.includes(id)) &&
                                                                        <EditIcon style={{ cursor: 'pointer' }} onClick={() => {
                                                                            setcurrentcomment({ cmt })
                                                                            handleucomments()
                                                                        }} />
                                                                    }
                                                                </div>
                                                            }
                                                        </div>

                                                    }).reverse()
                                                    }

                                                </CardContent>

                                            </Collapse>

                                            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>

                                                <TextareaAutosize style={{ width: '80%', height: '40px' }} name='comment' onChange={(e) => { setnewcomment(e.target.value) }} value={newcomment} placeholder="Add a comment..." />

                                                <button style={{ border: '1px solid green', backgroundColor: 'green', color: 'white', borderRadius: '4px' }} onClick={() => { handlecomment(`${post._id}`, post.userid, 2) }}>
                                                    Post
                                                </button>

                                            </div>

                                            {console.log(newcomment)}

                                        </Card>
                                    }


                                </div>

                            }).reverse().slice(5, 10)
                            }

                        </Box>




                        <Box flex={4} p={2} sx={{ marginTop: '-30px' }}>

                            {followingposts && followingposts?.map((user, index) => {


                                console.log(user, "HERE IS YOUR USER in banner page");

                                return <div key={index}>


                                    {user && user.followingdetails?.map((post, index) => {


                                        return <Card key={index} sx={{ margin: 5, borderRadius: '15px' }}>

                                            {console.log(user.following, "ooooooooooooo in banner")}
                                            {console.log(post.userid, "useriddddd in banner")}

                                            {/* {(user.following?.includes(post.userid)) ? */}

                                            {/* <> */}
                                            {console.log(post, "Correct in bannerr")}


                                            {usernames && usernames?.map((usernamee, index) => {
                                                return <div key={index}>

                                                    {console.log(usernamee, "Got user full detailsssssss in banner")}

                                                    {(post.userid?.includes(usernamee?._id)) &&
                                                        <>
                                                            <CardHeader
                                                                avatar={
                                                                    <StyledBadge
                                                                        overlap="circular"
                                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                        variant="dot"
                                                                    >
                                                                        <Avatar sx={{ bgcolor: "purple" }} alt="Christy" src={usernamee.ProfileData.profilePicture} />
                                                                    </StyledBadge>

                                                                }
                                                                action={
                                                                    <Button
                                                                        id="basic-button"
                                                                        aria-controls={open2 ? 'basic-menu' : undefined}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={open2 ? 'true' : undefined}
                                                                        onClick={(event) => {
                                                                            console.log(post._id, "POStid inside onclick handleclick2");
                                                                            setAnchorE2(event.currentTarget);

                                                                            handleClick2(post._id)
                                                                        }}
                                                                    >
                                                                        <MoreVert />
                                                                    </Button>
                                                                }

                                                                //{(post.userid?.includes(usernamee._id)) &&
                                                                // <>
                                                                title={usernamee.username}
                                                                // </>
                                                                // }
                                                                subheader={post.location}

                                                            />

                                                            <CardMedia
                                                                component="img"
                                                                height="300"
                                                                // image="https://www.wgu.edu/content/dam/web-sites/blog-newsroom/blog/images/national/2018/october/business-agreement.jpg"
                                                                src={post.postpic}
                                                                alt="Post"
                                                            />

                                                            <Stack direction="row" justifyContent="space-between">

                                                                <CardContent>
                                                                    <Typography variant="body1" fontWeight={800} color="text.secondary">
                                                                        {post.caption}<br />
                                                                        {/* {post._id} */}
                                                                    </Typography>

                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {post.description}
                                                                    </Typography>
                                                                </CardContent>

                                                                <p>{format(post?.createdAt)}  </p>

                                                            </Stack>


                                                            <CardActions disableSpacing>
                                                                {/* <IconButton aria-label="add to favorites"  onClick={likedpic} > */}


                                                                <IconButton>
                                                                    <p>{post?.liked?.length} likes</p>
                                                                </IconButton>

                                                                <IconButton aria-label="add to favorites">

                                                                    {/* <FavoriteIcon /> */}
                                                                    {/* <Checkbox icon={<FavoriteBorder style={{ color: 'red' }} />}
checkedIcon={<Favorite style={{ color: 'red' }} />}
/> */}

                                                                    {post.liked?.includes(id) ?
                                                                        <Favorite style={{ color: 'red' }} onClick={() => { handleunlike(`${post._id}`) }} /> :
                                                                        <FavoriteBorder style={{ color: 'red' }} onClick={() => { handlelike(`${post._id}`, post.userid, 1) }} />
                                                                    }

                                                                </IconButton>


                                                                <IconButton>


                                                                    {post.saved?.includes(id) ?
                                                                        <BookmarkIcon onClick={() => { handleunsave(`${post._id}`) }} style={{ color: '#d13087' }} /> :
                                                                        <BookmarkBorderIcon onClick={() => { handlesave(`${post._id}`) }} style={{ color: '#d13087' }} />
                                                                    }

                                                                </IconButton>

                                                                <ExpandMore
                                                                    expand={expanded}
                                                                    onClick={handleExpandClick}
                                                                    aria-expanded={expanded}
                                                                    aria-label="show more"
                                                                >
                                                                    <Typography paragraph>Comments</Typography>
                                                                    <ExpandMoreIcon />
                                                                </ExpandMore>
                                                            </CardActions>


                                                            <Collapse in={expanded} timeout="auto" unmountOnExit>

                                                                {getcomment && getcomment.map((cmt, index) => {

                                                                    return <div key={index} >
                                                                        {(cmt.postid.includes(post._id)) &&
                                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                                                <Stack direction='row' gap={1}>
                                                                                    <Avatar src={cmt?.senderDp} sx={{ bgcolor: "grey" }} aria-label="recipe" />
                                                                                    <h6>{cmt?.senderName}</h6>
                                                                                </Stack>

                                                                                <Typography paragraph>
                                                                                    {cmt.comment}
                                                                                </Typography>
                                                                                <Typography paragraph style={{ color: 'grey' }}>
                                                                                    {format(cmt.createdAt)}
                                                                                </Typography>

                                                                                {(cmt.userid.includes(id)) &&
                                                                                    <>
                                                                                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { deletecomment(cmt._id) }} />
                                                                                        <EditIcon style={{ cursor: 'pointer' }} onClick={() => {
                                                                                            setcurrentcomment({ cmt })
                                                                                            handleucomments()
                                                                                        }} />
                                                                                    </>
                                                                                }


                                                                            </div>
                                                                        }
                                                                    </div>

                                                                }).reverse()
                                                                }

                                                            </Collapse>

                                                            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>


                                                                <TextareaAutosize style={{ width: '80%', height: '40px' }} name='comment' onChange={(e) => { setnewcomment(e.target.value) }} value={newcomment} placeholder="Add a comment..." />
                                                                <button style={{ border: '1px solid green', backgroundColor: 'green', color: 'white', borderRadius: '4px' }} onClick={() => { handlecomment(`${post._id}`, post.userid, 2) }}>
                                                                    {/* <FavoriteBorder style={{ color: 'red' }} onClick={() => { handlelike(`${post._id}`, post.userid, 1) }} /> */}

                                                                    Post
                                                                </button>
                                                                {/* <Button >Post</Button> */}

                                                            </div>


                                                            <Menu
                                                                id="basic-menu"
                                                                anchorEl={anchorE2}
                                                                open={open2}
                                                                onClose={handleClose2}
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'basic-button',
                                                                }}
                                                            >
                                                                <MenuItem onClick={() => {
                                                                    console.log(otherpostid, "Post id when clicking the option");
                                                                    handlereports(otherpostid)
                                                                }} >

                                                                    <ListItemText>Report</ListItemText>
                                                                    <ListItemIcon>
                                                                        <ReportProblemIcon style={{ color: 'orange' }} />
                                                                        {/* <ReportProblemIcon style={{ color: 'orange' }} onClick={() => { handlereport(`${post._id}`) }} /> */}
                                                                    </ListItemIcon>
                                                                </MenuItem>

                                                                <MenuItem onClick={handleClose2}>Copy link</MenuItem>

                                                            </Menu>


                                                            <Modal
                                                                open={openreport}
                                                                onClose={handleClosereport}
                                                                aria-labelledby="modal-modal-title"
                                                                aria-describedby="modal-modal-description"
                                                            >

                                                                <Box bgcolor={"background.default"} color={"text.primary"} sx={{ marginLeft: '65vh' }} width={500} height={400} p={3} borderRadius={5} >
                                                                    <Stack direction="row" justifyContent="space-between" gap={10}>
                                                                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                                                                            Submit Your Report
                                                                        </Typography>
                                                                        <CloseIcon onClick={handleClosereport} />

                                                                    </Stack>

                                                                    <form style={{ marginTop: '-15px' }}>

                                                                        <div >

                                                                            <Tooltip title="Write a problem you are facing">
                                                                                <textarea style={{ borderRadius: '5px', width: '300px' }} type='text' required name="report" placeholder="Write your issue...." onChange={(e) => { setnewreport(e.target.value) }} value={newreport} />
                                                                            </Tooltip>

                                                                            <p>  </p>

                                                                        </div>

                                                                        <input className="submit" type="submit" style={{ backgroundColor: 'green', color: 'white', width: '300px' }}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handlereport(otherpostid)
                                                                            }} />
                                                                    </form>
                                                                </Box>
                                                            </Modal>

                                                        </>
                                                    }

                                                </div>

                                            })}

                                        </Card>

                                    }).slice(5, 10)
                                    }

                                </div>

                            }).reverse()
                            }

                        </Box>
                    </>
                    :
                    null
            }


            <Modal
                open={openupdatecomment}
                onClose={handleCloseucmt}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box bgcolor={"background.default"} color={"text.primary"} sx={{ marginLeft: '65vh' }} width={500} height={200} p={3} borderRadius={5} >
                    <Stack direction="row" justifyContent="space-between" gap={10}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            Update Your comment
                        </Typography>
                        <CloseIcon onClick={handleCloseucmt} />

                    </Stack>

                    {/* <form style={{ marginTop: '-15px' }}> */}

                    {console.log(currentcomment)}
                    <TextField
                        sx={{ width: "100%" }}
                        // id="filled-multiline-flexible"
                        // label="Caption"
                        placeholder={currentcomment?.cmt?.comment}
                        // value={caption} 
                        onChange={(e) => setnewcomment(e.target.value)}
                        name="comment"
                        multiline
                        maxRows={4}
                        variant="standard"
                    />
                    <Button type="submit" style={{ backgroundColor: 'green', color: 'white', float: 'right' }}
                        onClick={handleupdatecomment} >post</Button>
                    {/* </form> */}
                </Box>
            </Modal>



            {/* 
            <Button onClick={handleloadmore} sx={{ marginLeft: '40vh' }} variant="contained" component="label">
                Load more
            </Button> */}

        </Box >

    )
}

export default Banner


