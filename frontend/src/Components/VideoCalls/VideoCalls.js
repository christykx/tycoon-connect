import { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { Stack } from '@mui/system';
import { io } from 'socket.io-client'
import { AuthContext } from '../../authContext/AuthContext';
import { makeRequest } from '../../axios';


function VideoCalls(props) {
  const [peerId, setPeerId] = useState('');
  const [getpeerId, setgetPeerId] = useState('');
  // const [exactpeerid, setexactpeerid] = useState('');

  const [otheruserid, setotheruserid] = useState(props.otheruserid);
  const [otherusername, setotherusername] = useState(props.otherusername);

  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [callEnded, setCallEnded] = useState(false)
  const [calling, setCalling] = useState(false)

  const [answering, setanswering] = useState(false)

  const [writting, setwritting] = useState(false)

  const [socket, setsocket] = useState(null)
  const [onlineusers, setonlineusers] = useState([])


  const [mydetails, setmydetails] = useState([])

  const { currentUser } = useContext(AuthContext)
  const uid = currentUser.userid;


  useEffect(() => {
    setsocket(io("ws://localhost:8900"));
    // setsocket(io("https://example.com:8900"));
    
  }, [])


  useEffect(() => {

    makeRequest.get(`/users/getmyaccount/${uid}`).then((response) => {

      console.log(response, "Get user names");
      if (response.status) {
        console.log(response?.data, "Get user dataaaaaaa");
        setmydetails(response?.data[0])
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

  console.log(mydetails, "my details");


  //   useEffect(() => {

  //     socket?.emit("addUser", uid)
  //     socket?.on("getUsers", users => {
  //         console.log(users, "SOCKET USERSSSSSSSSSS");
  //         // setonlineusers(users);
  //     })
  // }, [socket,currentUser])


  useEffect(() => {
    console.log(uid, "uid");
    console.log(peerId, "peer id");
    if (peerId) {
      socket?.emit("addVideoUser", { userid: uid, peerid: peerId })
      socket?.on("getaddVideoUsers", peerusers => {
        console.log(peerusers, "Peer USERSSSSSSSSSS");
        setonlineusers(peerusers);
        console.log(otheruserid, "Other$$$$$");
        console.log(otherusername, "Other user name $$$$$");

        setgetPeerId(peerusers.filter(item => item.userid === otheruserid))
        // setexactpeerid(getpeerId[0]?.peerid)

      })
    }

  }, [socket, currentUser, peerId])


  console.log(onlineusers, "peer users in videocall.js");

  console.log(getpeerId, "gott peer idd");



  useEffect(() => {
    const peer = new Peer();
    console.log(peer, "peer");

    peer.on('open', (id) => {
      setPeerId(id)
    });

    peer.on('call', (call) => {
      let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {

        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        console.log(answering, "Answerrrrrrringg");
        setwritting(true)

        // handlevideo(uid, otheruserid, 4)
        // if (answering) {
        //   console.log("yahooo");
        // }


        // if (answering) {
        // console.log("Clicked answering");
         call.answer(mediaStream)
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
        // } else {
        //   console.log("Not updated");
        // }

      });
    })

    peerInstance.current = peer;

  // }, [answering])
  }, [])



  // useEffect(() => {
  //   console.log(answering, "Answering state");
  //   if (answering) {
  //     console.log("yahooo");
  //   }
  // }, [answering])



  console.log(peerId, "Mine");
  console.log(writting, "writting outside useeffect");
  console.log(answering, "answering outside useeffect");

  // console.log(remotePeerIdValue,"Other user");


  const call = (remotePeerId) => {
    console.log(remotePeerId, "this is my remote peer id");
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    console.log(getUserMedia, "Get user media");
    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      console.log(mediaStream, "Media stream")
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    }, (error) => {

      console.error(error, "Not working");
    })
  }


  const leaveCall = () => {
    setCallEnded(true)
    peerInstance.current.destroy()
  }


  const handlevideo = (myid, otheruserid, type) => {
    // e.preventDefault();
    console.log(myid, ":::::::::::::::::::::");
    console.log(otheruserid, "::::::::((((((((())))))))):::::::::");


    console.log(type, ":::::::typee:::::::::");


    let currentTime = new Date()

    socket?.emit("sendNotification", {
      senderid: myid,
      senderName: mydetails.username,
      receiverid: otheruserid,
      type,
    })

    makeRequest.post('/users/notificationspost', {
      senderid: myid,
      senderName: mydetails.username,
      receiverid: otheruserid,
      type,
    }).then((response) => {

      console.log(response, "RESSSSSSS");
      if (response.status) {
        console.log(response?.data, "Notification Dataaaaa");


        // makeRequest.get(`/users/getnotificationlength/${id}`).then((response) => {

        //     console.log(response, "Get notification length");
        //     if (response.status) {
        //         console.log(response?.data, "Get notification length");

        //         setnotificationlength(response?.data)

        //     }
        //     else {
        //         alert("Something went wrong")
        //     }
        // }).catch((err) => {
        //     console.log(err);
        //     alert(err.response.data)
        //     console.log("-----errrrr---", err.response.data);

        // })

      }
      else {
        alert("Something went wrong")
      }
    }, { withCredentials: true }).catch((err) => {
      console.log(err);
      alert(err.response.data)
      console.log("-----errrrr---", err.response.data);

    })


  }


  return (
    <div >

      <div>
        {writting &&
          <Stack>
            <h4 style={{ color: 'black' }} >{otherusername} is calling</h4>
            <button onClick={() => {
              // setanswer(true)
              // setanswering(true)
              // handlevideo(uid, otheruserid, 4)
            }
            }>Answer</button>
          </Stack>

        }

      </div>

      {console.log(getpeerId[0]?.peerid, "exactt peer id correct one")}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!calling && !writting ?
          <button onClick={() => {
            call(getpeerId[0]?.peerid)
            setCalling(true)
            // setanswer(true)
          }
          }>Call {otherusername}</button>
          :
          null
        }


        {/*       
      {!answer ?
        <button onClick={() => {
          setanswer(true)
          // handlevideo(uid, otheruserid, 4)
        }
        }>Answer</button>
        :
        null
      } */}


        <Stack direction="row" justifyContent="space-evenly">
          <div>
            <video ref={currentUserVideoRef} style={{ width: '300px' }} />
          </div>
          <div>
            <video ref={remoteVideoRef} style={{ width: '300px' }} />
          </div>
        </Stack>
        <button onClick={leaveCall}>End call</button>
      </div>
    </div>
  );
}

export default VideoCalls;