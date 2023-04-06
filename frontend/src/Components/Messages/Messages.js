import React, { useContext, useEffect, useRef, useState } from 'react'
import Chats from '../Chats/Chats'
import Conversations from '../Conversations/Conversations'
import SendIcon from '@mui/icons-material/Send';
import './Messages.css'
import { io } from "socket.io-client"

import ChatOnline from '../ChatOnline/ChatOnline';
import { AuthContext } from '../../authContext/AuthContext';
import { makeRequest } from '../../axios';
import { green } from '@mui/material/colors';
import axios from 'axios';
import { fontFamily, Stack, width } from '@mui/system';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideoCall from '@mui/icons-material/VideoCall';
import { config } from '../../url';
import { IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideoCalls from '../VideoCalls/VideoCalls';

function Messages() {

    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR inside Chat screen");
    const [mydetails, setmydetails] = useState([])
    const [myfollowing, setmyfollowing] = useState([])
    const [allusers, setallusers] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [newmessage, setnewmessage] = useState("")
    const [arrivalmessage, setarrivalmessage] = useState(null)
    const [getmessage, setgetmessage] = useState(" ")
    const [currentconversation, setcurrentconversation] = useState([])
    const [currentconversationid, setcurrentconversationid] = useState('')
    const [onlineusers, setonlineusers] = useState([])

    const [showChild, setShowChild] = useState(false);
    const [hide, sethide] = useState(false);


    const socket = useRef()

    const scrollRef = useRef()



    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        // socket.current = io("https://example.com:8900");

        
        socket?.current?.on("getmsg", (data) => {
            setarrivalmessage({
                sender: data?.senderid,
                text: data?.text,
                createdAt: Date.now()
            })
        })
    }, [socket,arrivalmessage])


    console.log(arrivalmessage, "Arrival message");

    useEffect(() => {

        arrivalmessage && currentconversationid?.members?.includes(arrivalmessage?.sender) &&
            setgetmessage((prev) => [...prev, arrivalmessage])
     
    }, [arrivalmessage, currentChat])


    useEffect(() => {

        socket?.current.emit("addUser", currentUser.userid)
        socket?.current.on("getUsers", users => {
            console.log(users, "SOCKET USERSSSSSSSSSS");
            setonlineusers(users);
        })
    }, [currentUser])



    useEffect(() => {


      
            makeRequest.get(`/users/conversationget/${id}`).then((response) => {

                if (response.status) {
                    console.log(response?.data, "Gettingg Conversation dataaaaaaa in MAIN chat pageee");
                    // console.log(response?.data.insertedId, "Get Conversation IDD");
                    // setconversationid(response?.data.insertedId)
                    setcurrentconversation(response?.data)
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


        makeRequest.get(`/users/getmyfollowing/${id}`).then((response) => {

            if (response.status) {
                console.log(response?.data, "Get following members idd");
                setmyfollowing(response?.data)

                console.log("Byeeeeeeeeeeeee");

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




        makeRequest.get('/users/getallusers').then((response) => {

            if (response.status) {
                console.log(response?.data, "Get all user dataaaaaaa");
                setallusers(response?.data)

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




    }, [])


    console.log(currentChat, "MY current chat detailsssssssssssss");


    function currentconv(otheruserid) {

        makeRequest.get(`/users/currentconv/${otheruserid}`).then((response) => {

            if (response.status) {
                console.log(response?.data, "Gettingg current Conversation dataaaaaaa");
                console.log(response?.data[0]._id, "Gettingg current Conversation dataaaaaaa iddd");
                setcurrentconversationid(response?.data[0])

                // console.log(response?.data.insertedId, "Get Conversation IDD");
                // setconversationid(response?.data.insertedId)

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



    const handleButtonClick = () => {
        setShowChild(true);
        sethide(true)
    }



    const handleSubmit = (type) => {

        console.log(currentconversationid._id, "Current conversation idd reached in message submit");
        console.log(newmessage, "Current message reached in message submit");
        let currentTime = new Date()
        // const msgdetails = {
        //     sender: id,
        //     text: newmessage,
        //     conversationId: currentChat._id,
        //     createdAt: currentTime
        // }

        // const receiverid = currentChat.members.find(member => member !== id)

        console.log("RECEIVER IDDDDDD");
        // console.log(receiverid);
        console.log(currentChat?._id);
        console.log("RECEIVER IDDDDDD");


        socket?.current?.emit("sendmsg", {
            senderid: id,
            receiverid: currentChat?._id,
            text: newmessage
        })


        socket?.current?.emit("sendNotification", {
            senderid: id,
            senderName: mydetails.username,
            receiverid: currentChat?._id,
            type,
        })



        makeRequest.post('/users/notificationspost', {
            senderid: id,
            senderName: mydetails.username,
            receiverid: currentChat?._id,
            type,
        }).then((response) => {

            console.log(response, "RESSSSSSS");
            if (response.status) {
                console.log(response?.data, "Notification Dataaaaa");
              
            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


        try {

            makeRequest.post('/users/message', {
                sender: id,
                text: newmessage,
                conversationId: currentconversationid._id,
                createdAt: currentTime
            }).then((response) => {

                console.log(response, "Message RESSSSSSS");
                if (response.status) {
                    console.log(response?.data, "Dataaaaa");

                    makeRequest.get(`/users/messageget/${currentconversationid?._id}`).then((response) => {
                        console.log(response?.data, "Get Messageee responseeeeee");
                        setgetmessage(response?.data)
                        setnewmessage(" ");

                    })

                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                console.log(err);
                console.log("-----errrrr---", err.response.data);

            })

        } catch (err) {
            console.log(err);
        }

    }


    useEffect(() => {

        makeRequest.get(`/users/messageget/${currentconversationid?._id}`).then((response) => {

            if (response.status) {
                console.log(response?.data, "Get Messageee dataaaaaaa");
                setgetmessage(response?.data)
                // setmydetails(response?.data)
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

    }, [currentconversationid])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [getmessage])



    return (

        <div className='messenger'>
            {
                !hide ?

                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            <input placeholder='Search for friends' className='chatMenuInput' />

                            {allusers && allusers.map((alluser, index) => {

                                return <div key={index}>
                                    {console.log({ alluser }, "HERE IS ALL USER ONE BY ONE in msg section")}
                                    {/* {mydetails && mydetails.map((user, index) => { */}
                                    {/* { console.log({ user }, "USER DATA REACHED HERE SUCCESSFULLy") } */}
                                    {/* return <div key={user._id}> */}
                                    {(mydetails.following?.includes(alluser._id)) &&
                                        <div onClick={() => {
                                            setcurrentChat(alluser);
                                            currentconv(alluser._id)
                                        }}>
                                            <Conversations friends={alluser} />

                                        </div>
                                    }

                                    {/* </div> */}

                                    {/* })} */}

                                </div>

                            })}

                        </div>
                    </div>

                    :
                    null
            }


            <div className='chatBox'>

                <div className='chatBoxWrapper'>

                    {
                        currentChat ?
                            <>
                                < div >
                                    {/* { console.log(currentChat,"Current chat in msg section")} */}
                                    <Stack direction="row" justifyContent="space-between">

                                        <div>
                                            <Stack direction="row" justifyContent="space-between">
                                                <img className='conversationImg' src={currentChat?.ProfileData.profilePicture} alt='' />
                                                <h5 style={{ fontVariant: 'small-caps', fontFamily: ' Garamond, serif ', fontWeight: 'bold' }}>{currentChat?.username}</h5>
                                            </Stack>
                                        </div>


                                        <IconButton style={{ marginTop: '-6px', marginRight: '-15px', backgroundColor: 'white' }}>
                                            {!hide ?

                                                <VideoCall onClick={handleButtonClick} style={{ color: 'green', fontSize: '35px', marginLeft: '5px', marginTop: '-4px' }} />
                                                :
                                                null
                                            }
                                            {showChild && <VideoCalls otheruserid={currentChat?._id} otherusername={currentChat?.username} />}

                                            {/* <VideocamIcon/> */}
                                        </IconButton>

                                    </Stack>

                                </div>

                                {
                                    !hide ?

                                        <>
                                            <div className='chatBoxTop'>

                                                {
                                                    getmessage.map((m, index) => {
                                                        console.log({ m }, "Getting messages one by onee");
                                                        return <div ref={scrollRef} key={index}>
                                                            <Chats chat={m} own={m.sender === id} />
                                                        </div>
                                                    })
                                                }

                                            </div>
                                            <div className='chatBoxBottom'>
                                                <textarea placeholder="write something..." className='chatMessageInput' onChange={(e) => { setnewmessage(e.target.value) }} value={newmessage}></textarea>
                                                <button style={{ width: '5px', height: '50px' }} className='chatSubmitButton' onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSubmit(3)

                                                }}>
                                                    <SendIcon style={{ fontSize: '35px', marginTop: '-2px' }} />
                                                </button>
                                            </div>


                                        </>
                                        :
                                        null
                                }


                            </>
                            :
                            <span className='noConversationText'>Open a conversation to start a chat</span>

                    }

                </div>
            </div>
            <div className='chatOnline'>
                <div className='chatOnlineWrapper'>
                    {/* <ChatOnline onlineusers={onlineusers} currentid={id} /> */}
                </div>
            </div>
        </div>
    )
}

export default Messages


