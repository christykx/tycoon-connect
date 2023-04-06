import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import Topbar from '../Topbar/Topbar'

import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function Profile() {

  const [posts, setposts] = useState([])
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const id = currentUser.userid;
  console.log(id, "CURRENT USERRR");

  useEffect(() => {
    axios.get(`http://localhost:3001/users/getpost/${id}`).then((response) => {

      console.log(response, "RESSSSSSS");
      if (response.status) {
        console.log(response.data, "Dataaaaa");
        setposts(response.data)

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


  return (
    <div >
      <Topbar />
      <LeftSidebar />
      <div style={{ border: '2px solid grey', borderRadius: '200px', width: '200px', height: '200px', marginLeft: '400px' }}></div>
      <h3 style={{ marginLeft: '700px', marginTop: '-150px' }}>Christy</h3>

      <h6 style={{ marginLeft: '900px', marginTop: '-3.5%', border: '2px solid green', width: '150px', padding: '8px', paddingLeft: '29px' }}>Edit Profile</h6>
      <h6 style={{ marginLeft: '700px', marginTop: '5px' }}>Post number </h6>
      <h6 style={{ marginLeft: '900px', marginTop: '-25px' }}>Connections</h6>
      {/* upload */}
      <Button style={{ marginLeft: '446px',marginTop:'100px'}} variant="contained" startIcon={<CameraAltIcon />} component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      {/* upload */}  
      <div style={{ display: 'flex' }}>
        <h3 style={{ marginLeft: '400px', marginTop: '80px' }}>Posts</h3>
        <h3 style={{ marginLeft: '400px', marginTop: '80px' }}>Saved</h3>
      </div>


      {posts && posts.map((post, index) => {

        return <div key={index} style={{ marginLeft: '450px' }}>
          {/* <h6 style={{ marginLeft: '90px', paddingTop: '10px' }}>{username}</h6> */}
          {/* <h6 style={{ marginLeft: '90px' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg> {post.location}</h6> */}

          <hr></hr>
          <h6 style={{ marginLeft: '15px' }}>{post.caption}</h6>
          <h6 style={{ fontWeight: 'normal', marginLeft: '15px' }}>{post.description}</h6>
          {/* <h1 style={{ minWidth: '10px' }}>{post.postpic}</h1> */}
          <img style={{ width: '495px', height: '220px' }} src={`http://localhost:3001/uploads/${post.postPicture}`} />



        </div>
      }).reverse()
      }

    </div>
  )
}

export default Profile
