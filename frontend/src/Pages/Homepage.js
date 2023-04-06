import React, { useContext, useEffect, useRef, useState } from 'react'
import Banner from '../Components/Banner/Banner'
import LeftSidebar from '../Components/LeftSidebar/LeftSidebar'
import RightSidebar from '../Components/RightSidebar/RightSidebar'
import Topbar from '../Components/Topbar/Topbar'
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material"
import { AuthContext } from '../authContext/AuthContext'
import { io } from 'socket.io-client'
import VideoCalls from '../Components/VideoCalls/VideoCalls'


function Homepage() {
  const [mode, setMode] = useState("light")
  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })




  const { currentUser } = useContext(AuthContext)
  const id = currentUser.userid;
  console.log(id, "CURRENT USERRR idd");


  const [onlineusers, setonlineusers] = useState([])
  const [socket, setsocket] = useState(null)

  // const socket = useRef()



  useEffect(() => {
    
    setsocket(io("ws://localhost:8900"));
    // setsocket(io("https://example.com:8900"));

    // socket.current.on("getmsg", data => {
    //     // setarrivalmessage({
    //     //     sender: data.senderid,
    //     //     text: data.text,
    //     //     createdAt: Date.now()
    //     // })
    // })

  }, [])



  useEffect(() => {


    socket?.emit("addUser", id)
    socket?.on("getUsers", users => {
      console.log(users, "SOCKET USERSSSSSSSSSS");
      setonlineusers(users);
    })
  }, [socket, currentUser])




  return (
    // <div>
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Topbar socket={socket} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftSidebar setMode={setMode} mode={mode} />
          <Banner socket={socket} />
          <RightSidebar />
        </Stack>
      </Box>
    </ThemeProvider>
    // </div>
  )
}

export default Homepage
