import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios';

function AdminDashboard() {

  const [allusers, setallusers] = useState([]);
  const [alluserslength, setalluserslength] = useState('');


  useEffect(() => {

    makeRequest.get('/users/getallusers').then((response) => {

      console.log(response, "Get user names");
      if (response.status) {
        console.log(response?.data, "Get user dataaaaaaa");
        setallusers(response?.data)
        setalluserslength(response?.data.length);

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


  }, [])

  return (
    <div>

      <div style={{ textAlign: 'center', padding: '30vh', fontWeight: 'bolder', fontSize: '40px' }}>
        Welcome To Admin Dashboard
      </div>
      <h4 style={{ textAlign: 'center',marginTop:'-60px', fontWeight: 'bolder', fontSize: '40px' }}>Total Users: {alluserslength}</h4>

    </div>


  )
}

export default AdminDashboard