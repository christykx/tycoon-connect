import React, { useContext, useEffect, useState } from 'react'
import Chats from '../Chats/Chats'
import Conversations from '../Conversations/Conversations'
import SendIcon from '@mui/icons-material/Send';
import './Messages.css'

import ChatOnline from '../ChatOnline/ChatOnline';
import { AuthContext } from '../../authContext/AuthContext';
import { makeRequest } from '../../axios';
import { green } from '@mui/material/colors';
import axios from 'axios';

function Messages() {

    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR inside Chat screen");
    const [mydetails, setmydetails] = useState([])
    const [myfollowing, setmyfollowing] = useState([])
    const [allusers, setallusers] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [newmessage, setnewmessage] = useState(" ")
    const [getmessage, setgetmessage] = useState(" ")
    const [currentconversation, setcurrentconversation] = useState([])
    const [currentconversationid, setcurrentconversationid] = useState('')




    // console.log(conversationid, "Conversation id is hereee");



    useEffect(() => {


        makeRequest.get(`http://localhost:3001/users/conversationget/${id}`).then((response) => {

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
                setmydetails(response?.data)

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

        makeRequest.get(`http://localhost:3001/users/currentconv/${otheruserid}`).then((response) => {

            if (response.status) {
                console.log(response?.data, "Gettingg current Conversation dataaaaaaa");
                console.log(response?.data[0]._id, "Gettingg current Conversation dataaaaaaa iddd");
                setcurrentconversationid(response?.data[0]._id)

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



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentconversationid, "Current conversation idd reached in message submit");
        console.log(newmessage, "Current message reached in message submit");
        let currentTime = new Date()
        // const msgdetails = {
        //     sender: id,
        //     text: newmessage,
        //     conversationId: currentChat._id,
        //     createdAt: currentTime
        // }

        try {

            makeRequest.post('/users/message', {
                sender: id,
                text: newmessage,
                conversationId: currentChat._id,
                createdAt: currentTime
            }).then((response) => {

                console.log(response, "Message RESSSSSSS");
                if (response.status) {
                    console.log(response?.data, "Dataaaaa");

                    makeRequest.get(`/users/currentmessage/${response?.data.insertedId}`).then((response) => {
                        console.log(response?.data, "Gettting msg response");
                        setgetmessage(response?.data)
                    })
                    // alert("Post Details kitti")

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


        makeRequest.get(`/users/messageget/${currentChat._id}`).then((response) => {

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



    }, [currentChat])


    { console.log(getmessage, "message is showing here") }

    return (
        <div className='messenger'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                    <input placeholder='Search for friends' className='chatMenuInput' />

                    {allusers && allusers.map((alluser, index) => {

                        return <div key={index}>
                            {console.log({ alluser }, "HERE IS ALL USER ONE BY ONE")}
                            {mydetails && mydetails.map((user, index) => {
                                { console.log({ user }, "USER DATA REACHED HERE SUCCESSFULLy") }
                                return <div key={user._id}>
                                    {(user.following?.includes(alluser._id)) &&
                                        <div onClick={() => {
                                            setcurrentChat(alluser);
                                            currentconv(alluser._id)
                                        }}>
                                            <Conversations friends={alluser?.username} />

                                        </div>
                                    }

                                </div>

                            })}

                        </div>

                    })}



                </div>
            </div>
            <div className='chatBox'>

                <div className='chatBoxWrapper'>

                    {
                        currentChat ?
                            <>
                                <div className='chatBoxTop'>

                                    {
                                        getmessage.map((m) => {
                                            console.log({ m }, "Getting messages one by onee");
                                            return <Chats chat={m} own={m.sender === id} />
                                        })
                                    }

                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea className='chatMessageInput' placeholder='write something...'
                                        onChange={(e) => { setnewmessage(e.target.value) }}
                                        value={newmessage}
                                    ></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>
                                        <SendIcon />
                                    </button>
                                </div>
                            </>
                            :
                            <span className='noConversationText'>Open a conversation to start a chat</span>

                    }


                </div>
            </div>
            <div className='chatOnline'>
                <div className='chatOnlineWrapper'>
                    {/* <ChatOnline /> */}


                </div>
            </div>
        </div>
    )
}

export default Messages