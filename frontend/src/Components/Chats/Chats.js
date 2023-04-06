import React from 'react'
import './Chats.css'
import { format } from "timeago.js"



function Chats({ chat, own }) {

    console.log({chat},"Message reached in chats page one by one");

    // const d=new Date()
    // console.log(d,"DATEEEEEEE ");    
    // console.log(format(d),"DATEEEEEEE ");

    return (
        <div className={own ? "chat own" : "chat"}>
            <div className='messageTop'>
                <img className='messageImg' src='https://media.istockphoto.com/id/1318482009/photo/young-woman-ready-for-job-business-concept.jpg?b=1&s=170667a&w=0&k=20&c=qr9IZO49bYbal9ID9FzvVDe_V6GdcZhY9a3eGbeL4E0=' alt='' />
                <p className='messageText'>
                    {chat.text}
                </p>
            </div>
            <div className='messageBottom'>
             {format(chat.createdAt)}
            </div>

        </div>
    )
}

export default Chats