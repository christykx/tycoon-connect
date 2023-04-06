import React from 'react'
import { useNavigate } from 'react-router-dom'


function LeftSidebar() {
    const navigate=useNavigate()
    return (
        <div style={{ padding: '20px' }}>

            <div style={{ width: '250px', position: 'fixed', height: '100px', backgroundColor: 'white', border: '2px solid grey', borderRadius: '8px' }}>

                <div style={{ width: '80px', position: 'fixed', height: '80px', backgroundColor: 'white', border: '2px solid grey', borderRadius: '70px', marginTop: '5px', marginLeft: '5px' }}>
                </div>
                <div style={{marginLeft:'100px',marginTop:'-15px'}}>
                        <p style={{fontWeight:'bold'}}>Christy</p>
                        <p>Christy@gmail.com</p>

                    </div>

            </div>


            <br />

            {/* <p>Left side bar</p> */}
            <div style={{ marginTop: '100px', width: '250px', position: 'fixed', height: '355px', backgroundColor: 'white', border: '2px solid grey', borderRadius: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '20px' }}>
                    <br />
                    <div onClick={()=>{navigate('/')}} style={{ display: 'flex', flexDirection: 'row' ,cursor:'pointer'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="#1ed696" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                        </svg>
                        <p style={{ marginTop: '-2px', fontWeight: 'bold' }}>Home</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="#0f2c5e" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>

                        <p style={{ marginTop: '-2px', fontWeight: 'bold' }}>Search</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="#fc0fb9" class="bi bi-messenger" viewBox="0 0 16 16">
                            <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
                        </svg>
                        <p style={{ marginTop: '-2px', fontWeight: 'bold' }}>Chat</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" s width="30" height="16" fill="#703f47" class="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>

                        <p style={{ marginTop: '-2px', fontWeight: 'bold' }}>Notifications</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="#caed18" class="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>

                        <p onClick={()=>{navigate('/create')}} style={{ marginTop: '-2px',cursor:'pointer', fontWeight: 'bold' }}>Create</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="#8d18ed" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                        </svg>
                        <p style={{ marginTop: '-2px', fontWeight: 'bold' }}>Saved</p>

                    </div>



                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="red" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>

                        <p style={{ marginTop: '-2px', fontWeight: 'bold' }}>Logout</p>

                    </div>




                </div>


            </div>

        </div>
    )
}

export default LeftSidebar
