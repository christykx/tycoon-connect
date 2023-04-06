import React, { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import Topbar from '../Topbar/Topbar'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { makeRequest } from '../../axios';



function CreatePost() {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const [caption, setcaption] = useState('');
    const [location, setlocation] = useState('');
    const [description, setdescription] = useState('');
    const [postpic, setpostpic] = useState('');
    const [postpreview, setpostpreview] = useState('');



    const { currentUser } = useContext(AuthContext)
    const userid=currentUser.userid;
    console.log(userid,"CURRENT USERRR");


    // console.log(profilepic.name,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

    const imageUpload=(e)=>{
        console.log("aaaaaaa",e.target.files[0]);
        setpostpic(e.target.files[0])
        setpostpreview(URL.createObjectURL(e.target.files[0]))
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();

        console.log(postpic);
        console.log(postpic.name);
        console.log(caption);
        console.log(location);
        console.log(description);  

        const formdata=new FormData();

        let currentTime = new Date()

        formdata.append("postpic",postpic)
        formdata.append("caption",caption)
        formdata.append("description",description)
        formdata.append("location",location)
        formdata.append("userid",userid)
        formdata.append("createdAt",currentTime)


        console.log(formdata,"FORMDATAAA");

        makeRequest.post('/users/post',formdata).then((response) => {

            if (response.status) {
                console.log(response.data, "Dataaaaa");
                console.log(response.status);
                console.log("Hellooooooooo");
                alert("Post created successfully")
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


        // navigate('/form')

    }

    return (

        <div>
            <Topbar />
            <LeftSidebar />
            <RightSidebar />
            <div style={{ marginLeft: '500px', marginTop: '50px' }}>
                <button onClick={handleShow} style={{ backgroundColor: 'white', border: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="black" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </button>
                {/* <br/> */}
                <h6 style={{ marginLeft: '97px', fontWeight: 'bolder', color: 'grey' }}>Add new Post</h6>

            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Woohoo, you're reading this text in a modal! */}

                    {/* <div style={{ width: '100px', height: '100px', marginLeft: '155px', backgroundColor: 'grey' }}></div> */}
             
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <img  style={{width:'300px',height:'200px'}} src={postpreview}/>
                    <input
                        className="form-control-file"
                        type="file"
                        // filename='postpic'
                        // accept='.png,.jpg,.jpeg'
                        style={{ border: 'none', borderRadius: '5px' }}
                        // value={postpic}
                        // onChange={(e) => setpostpic(e.target.files[0])}
                        onChange={imageUpload}

                        // id="companyLogo"
                        name="postpic"
                    />
                    {/* console.log(profilepic); */}
                    <input type="text" style={{ border: '2px solid grey' }} value={caption} onChange={(e) => setcaption(e.target.value)} name="caption" placeholder="Caption" />
                    <input type="text" style={{ border: '2px solid grey' }} value={location} onChange={(e) => setlocation(e.target.value)} name="location" placeholder="Location" />
                    <input type="text" style={{ border: '2px solid grey' }} value={description} onChange={(e) => setdescription(e.target.value)} name="description" placeholder="Description" />
                    <button type='submit' style={{ borderRadius: '6px',marginLeft:'8px', border: 'none', height: '40px', backgroundColor: 'orange' }}>Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleSubmit}>
                        Create
                    </Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default CreatePost
