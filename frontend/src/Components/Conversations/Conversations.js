import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../authContext/AuthContext';
import { makeRequest } from '../../axios';
import { config } from '../../url';
import Chats from '../Chats/Chats';
import './Conversations.css'

function Conversations({friends}) {


    const { currentUser } = useContext(AuthContext)
    const id = currentUser.userid;
    console.log(id, "CURRENT USERRR inside Chat screen");
    const [mydetails, setmydetails] = useState([])
    const [myfollowing, setmyfollowing] = useState([])
    const [allusers, setallusers] = useState([])
    const [profile, setprofile] = useState([])
    const [conversationid, setconversationid] = useState('')


    


    useEffect(() => {


        // makeRequest.get(`https://tycoonconnectapi.onrender.com/users/conversationget/${id}`).then((response) => {
        makeRequest.get(`/users/conversationget/${id}`).then((response) => {

        if (response.status) {
            console.log(response?.data, "Gettingg Conversation dataaaaaaa");
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




        // makeRequest.get(`/users/getdp`).then((response) => {

        //     console.log(response, "Get Profile");
        //     if (response.status) {
        //         console.log(response?.data, "Get Profile dataaaaaaa");
        //         setprofile(response?.data)



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




    }, [])


    return (

        // <div>

                                <div className='conversation' >
                                    <img className='conversationImg' src= {friends?.ProfileData.profilePicture} alt='' />
                                    <span className='conversationName'>{friends?.username}</span>
                                </div>

                       
        // </div>

    )
}

export default Conversations