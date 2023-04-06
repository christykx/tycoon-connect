import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios';
import './ChatOnline.css'

function ChatOnline({ onlineusers, currentid }) {

    const [friends, setfriends] = useState([]);
    const [onlinefriends, setonlinefriends] = useState([]);

    useEffect(() => {

        makeRequest.get(`/users/getmyfollowing/${currentid}`).then((response) => {

            if (response.status) {
                console.log(response?.data, "Get following members idsss");
                setfriends(response?.data)

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


    }, [currentid])


    console.log(friends, "Friends list");

    return (
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img className='chatOnlineImg' src='https://media.istockphoto.com/id/1318482009/photo/young-woman-ready-for-job-business-concept.jpg?b=1&s=170667a&w=0&k=20&c=qr9IZO49bYbal9ID9FzvVDe_V6GdcZhY9a3eGbeL4E0=' alt='' />
                    <div className='chatOnlineBadge'>

                    </div>
                </div>
                <span className='chatOnlineName'>Joyal</span>
            </div>

        </div>
    )
}

export default ChatOnline