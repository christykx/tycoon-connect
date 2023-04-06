import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../authContext/AuthContext'
import { makeRequest } from '../../axios'
// import { PostContext } from '../../store/PostContext'
import { PostContext } from '../../store/PostContext'

import { config } from '../../url'

function RightSidebar() {
    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR");


    const [allusers, setallusers] = useState([])

    const [suggestionusers, setsuggestionusers] = useState([])


    const { setPostDetails } = useContext(PostContext) 

    const [username, setusername] = useState('')
    const [useremail, setuseremail] = useState('')

    const [followingstatus, setfollowingstatus] = useState([])

    const [usernames, setusernames] = useState([])
    const [userfollowing, setuserfollowing] = useState([])
    const navigate = useNavigate() 


    const [conversationid, setconversationid] = useState('')


    // const randomIndex = Math.floor(Math.random() * allusers.length);

    // const randomUser = allusers[randomIndex];
    // console.log(randomUser, "RANDOM USER PRINT");




    const handlefollowing = (randomuserid) => {

        makeRequest.post('/users/following', {
            userid: id,
            otheruserid: randomuserid
        }).then((response) => {

            console.log(response, " Following RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Following Dataaaaa");

                // setposts(response?.data)
                setfollowingstatus(response?.data);

                console.log("Haiii----------");

                following(randomuserid)
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
        // console.log(otheruserid, "This is another user id");
        // console.log(id, "This is my account id");
        // makeRequest.post('http://localhost:3001/users/conversation', { userid: id, otheruserid }).then((response) => {

        //     if (response.status) {
        //         console.log(response?.data, "Get Conversation dataaaaaaa");
        //         console.log(response?.data.insertedId, "Get Conversation IDD");
        //         setconversationid(response?.data.insertedId)

        //         console.log("Hoiiiiiiiiiiii");

        //         // alert("Post Details kitti") 
        //         // navigate('/profile')
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


    { console.log(conversationid, "MY CONVERSATION ID") }


    const handleunfollow = (randomuserid) => {

        makeRequest.post('/users/unfollow', {
            userid: id,
            otheruserid:randomuserid
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



    useEffect(() => {
        makeRequest.get('/users/getallusers').then((response) => {

            if (response.status) {
                console.log(response?.data, "Get all user dataaaaaaa");
                setallusers(response?.data)

                console.log("Hoiiiiiiiiiiii");


            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        makeRequest.get('/users/getsuggestionusers').then((response) => {

            if (response.status) {
                console.log(response?.data, "Get suggestion user dataaaaaaa");
                setsuggestionusers(response?.data)
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


    }, [])





    // const { postDetails } = useContext(PostContext)
    // useEffect(() => {

    //     // const {} = postDetails
    //     console.log("Post details reached view single user page");
    //     console.log(postDetails);

    // }, [])



    return (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }} >
            <Box position="fixed" style={{ width: '25%', border: '2px solid grey', borderRadius: '40px', padding: '5px' }} >
                <Typography fontWeight={400} style={{ textAlign: 'center', padding: '10px' }}>
                    Suggestions For You
                </Typography>

                <List sx={{ width: '100%', borderRadius: '40px', maxWidth: 300, bgcolor: 'background.paper' }}>

                    {suggestionusers && suggestionusers.map((randomUser, index) => {

                   return <div key={index}>

                        {!randomUser?._id.includes(id) &&
                            <ListItem alignItems="flex-start" style={{cursor:'pointer'}} onClick={()=>{
                                setPostDetails(randomUser)
                                navigate('/viewuser')

                            }}>
                                <ListItemAvatar>
                                    <Avatar alt="" src={randomUser?.ProfileData?.profilePicture} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={randomUser?.username}
                                />


                                {usernames && usernames.map((user, index) => {

                                    return <div key={index}>

                                        {console.log(id, "..........._id")}

                                        {(user.following?.includes(randomUser?._id)) ?

                                            <Button onClick={()=>{handleunfollow(randomUser?._id)}} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                                                unfollow
                                            </Button>
                                            :
                                            <Button onClick={()=>{handlefollowing(randomUser?._id)}} sx={{ margin: '10px', marginLeft: '45px' }} variant="contained" component="label">
                                                follow
                                            </Button>
                                        }

                                    </div>

                                })}

                            </ListItem>

                        }

                        <Divider variant="inset" component="li" />

                    </div>
                   })}





                </List>


            </Box>
        </Box>

    )
}

export default RightSidebar
