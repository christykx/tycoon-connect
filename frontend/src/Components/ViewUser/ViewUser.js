import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../store/PostContext'
import { AuthContext } from '../../authContext/AuthContext';


import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Avatar, Modal, Stack, styled } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Badge from '@mui/material/Badge';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeRequest } from '../../axios';
import { config } from '../../url';





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


function ViewUser() {



  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const [posts, setposts] = useState([])
  const [profile, setprofile] = useState([])
  const [profileview, setprofileview] = useState('');
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const id = currentUser.userid;
  console.log(id, "CURRENT USERRR");


  const [username, setusername] = useState('')
  const [useremail, setuseremail] = useState('')

  const [followingstatus, setfollowingstatus] = useState([])

  const [usernames, setusernames] = useState([])
  const [userfollowing, setuserfollowing] = useState([])


  const [conversationid, setconversationid] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const imageUpload = (e) => {
    console.log("aaaaaaa", e.target.files[0]);
    setprofile(e.target.files[0])
    setprofileview(URL.createObjectURL(e.target.files[0]))
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(profile, "*********************");
    // console.log(postpic.name);
    // console.log(caption);
    // console.log(location);
    // console.log(description);

    const formdata = new FormData();
    formdata.append("profile", profile)
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


    // navigate('/form')

  }


  const handlefollowing = () => {

    makeRequest.post('/users/following', {
      userid: id,
      otheruserid: postDetails._id
    }).then((response) => {

      console.log(response, " Following RESSSSSSS");
      if (response.status) {
        console.log(response?.data, "Following Dataaaaa");

        // setposts(response?.data)
        setfollowingstatus(response?.data);

        console.log("Haiii----------");

        following(postDetails._id)
        // window.location.reload(false);

        // alert("Post Details kitti")
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




  function following(otheruserid) {
    console.log(otheruserid, "This is another user id");
    console.log(id, "This is my account id");
    makeRequest.post('/users/conversation', { userid: id, otheruserid }).then((response) => {

      if (response.status) {
        console.log(response?.data, "Get Conversation dataaaaaaa");
        console.log(response?.data.insertedId, "Get Conversation IDD");
        setconversationid(response?.data.insertedId)

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


  { console.log(conversationid, "MY CONVERSATION ID") }


  const handleunfollow = () => {

    makeRequest.post('/users/unfollow', {
      userid: id,
      otheruserid: postDetails._id
    }).then((response) => {

      console.log(response, " Following RESSSSSSS");
      if (response.status) {
        console.log(response?.data, "Following Dataaaaa");

        // setposts(response?.data)
        setfollowingstatus(false);

        console.log("Haiii----------");

        // window.location.reload(false);
        // alert("Post Details kitti")
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


  // console.log(followingstatus, "My following status");

  useEffect(() => {



    makeRequest.get(`/users/getmyaccount/${id}`).then((response) => {

      console.log(response, "Get user names");
      if (response.status) {
        console.log(response?.data, "Get user dataaaaaaa");
        setusernames(response?.data)

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




    makeRequest.get(`/users/getpost/${postDetails._id}`).then((response) => {

      console.log(response, "RESSSSSSS");
      if (response.status) {
        console.log(response?.data, "Dataaaaa");
        setposts(response?.data)

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


    makeRequest.get(`/users/getprofile/${postDetails._id}`).then((response) => {

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


  }, [])



  const { postDetails } = useContext(PostContext)
  useEffect(() => {

    const { } = postDetails
    console.log("Post details reached view single user page");
    console.log(postDetails);

  }, [])


  return (
    // <Box flex={4} p={2}>
    //   <h1>View single user userid{postDetails._id} </h1>
    //   <h1>{postDetails.username} </h1>
    //   <h1>{postDetails.email} </h1>usernames

    // </Box>


    <Box flex={4} p={2} sx={{ overflow: 'hidden' }}  >

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


            {console.log("userfollowingggggggggggggggggggggggggg")}

            {console.log(usernames)}


            {/* {userfollowing &&
              userfollowing.map((user, index) => {
                console.log({ user }, "YAhoooooooooooooooooooo");
                { console.log(`${user.userid}`, "Following userid") }
                { console.log(`${id}`, "Current user id") }
                { console.log(`${user.otheruserid}`, "other user id") }
                { console.log(`${postDetails._id}`, "Post details other user id") }

                // if ((`${user.userid}` === `${id}`) && (`${user.otheruserid}` === `${postDetails._id}`) ) {
                return <div key={index} >
                  {console.log("Hi alll")}
                  {console.log({ user }, "kitttiiiiiiiiiii")}

                  {
                    (user?.isFollowing) ?


                      <Button sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                        unfollow
                      </Button>
                      :
                      <Button onClick={handlefollowing} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                        follow
                      </Button>
                  }

                </div>

                // }
                // else{
                //   return <Button key={index} onClick={handlefollowing} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                //   followss
                // </Button>

                // }


              })


            } */}



            {usernames && usernames.map((user, index) => {
              return <div key={user._id}>

                {console.log(id, "..........._id")}

                {(user.following?.includes(postDetails._id)) ?

                  <Button onClick={handleunfollow} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                    unfollow
                  </Button>
                  :
                  <Button onClick={handlefollowing} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                    follow
                  </Button>
                }

              </div>

            })}


          </Stack>
        </Box>

        <Box
          sx={{
            width: 300,
            height: 200,
          }}
        >
          <Typography variant='h6' sx={{ textAlign: 'center', marginTop: '50px' }}>{postDetails.username}</Typography>

          <Typography variant="body2" sx={{ textAlign: 'center' }}>{postDetails.email}</Typography>
          {/* <Typography variant="body2" sx={{textAlign:'center'}}>BusinessName:Tycoon</Typography> */}


          <Stack direction="row" justifyContent="space-evenly" sx={{ margin: '20px' }}>
            <Typography>Posts</Typography>
            <Typography>Followers</Typography>
            <Typography>Following</Typography>
          </Stack>
        </Box>
      </Stack >


      <Box sx={{ width: '100%', margin: '15px' }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider',float:'right' }}> */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflow: 'hidden' }}>

          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Posts" {...a11yProps(0)} />
            {/* <Tab label="Saved Posts" {...a11yProps(1)} /> */}
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>


        <TabPanel value={value} index={0}>

          {/* Posts */}

          <ImageList sx={{ width: 700, height: 450 }} >
            {/* <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Posts</ListSubheader>
            </ImageListItem> */}

            {posts && posts.map((post, index) => {
              return <ImageListItem key={index}>
                <img
                  src={post.postPicture}
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
            })
            }
          </ImageList>

        </TabPanel>

        {/* <TabPanel value={value} index={1}>
          Saved
        </TabPanel> */}
        {/* <TabPanel value={value} index={2}>
        Item Three
    </TabPanel> */}

      </Box>

    </Box >
  )

}

export default ViewUser
