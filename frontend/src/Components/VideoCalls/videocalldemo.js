// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
// import React, { useEffect, useRef, useState } from "react"
// import { CopyToClipboard } from "react-copy-to-clipboard"
// import Peer from "simple-peer"
// import io from "socket.io-client"
// import "./VideoCall.css"

// const socket = io("ws://localhost:8900");

// function VideoCall() {

//   const [me, setMe] = useState("")
//   const [stream, setStream] = useState()
//   const [receivingCall, setReceivingCall] = useState(false)
//   const [caller, setCaller] = useState("")
//   const [callerSignal, setCallerSignal] = useState()
//   const [callAccepted, setCallAccepted] = useState(false)
//   const [idToCall, setIdToCall] = useState("")
//   const [callEnded, setCallEnded] = useState(false)
//   const [name, setName] = useState("")
//   const myVideo = useRef()
//   const userVideo = useRef()
//   const connectionRef = useRef()

//   useEffect(() => {

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       setStream(stream)
//       console.log(stream, "setting stream");
//       console.log(myVideo, "myvideo");
//       if (myVideo.current) {
//         myVideo.current.srcObject = stream;   
//       }
//     })

//   }, [])

//   useEffect(() => {
//     socket.on("me", (id) => {
//       setMe(id)
//       console.log(me, "IDDDDDDD");
//     })

//     socket.on("callUser", (data) => {
//       setReceivingCall(true)
//       setCaller(data?.from)
//       setName(data?.name)
//       setCallerSignal(data?.signal)
//       console.log("dataaa", data);
//       console.log(caller, "CAller");
//       console.log(name, "Namee");

//     })

//   }, [])

//   const callUser = (id) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: stream
//     })
//     peer.on("signal", (data) => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name: name
//       })
//     })
//     peer.on("stream", (stream) => {
//       if (userVideo.current) {
//         // userVideo.current.srcObject = stream 
//         userVideo.current.srcObject = stream     
//       }

//     })
//     socket.on("callAccepted", (signal) => {
//       setCallAccepted(true)
//       peer.signal(signal)
//     })

//     connectionRef.current = peer

//   }

//   const answerCall = () => {
//     setCallAccepted(true)
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream: stream
//     })
//     peer.on("signal", (data) => {
//       socket.emit("answerCall", { signal: data, to: caller })
//     })
//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;

//     })

//     peer.signal(callerSignal)
//     connectionRef.current = peer
//   }

//   const leaveCall = () => {
//     setCallEnded(true)
//     connectionRef.current.destroy()
//   }

//   return (
//     <div className="maindiv">
//       {/* <> */}
//       <h1 style={{ color: 'black' }}>Zoomish</h1>
//       <div className="container">
//         <div className="video-container">
//           <div className="video">
//             {console.log(stream, "streammm")}
//             {console.log(myVideo, "my videoo printing")}
//             {stream ? <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
//               :
//               <h1>christy</h1>
//             }
//           </div>
//           <div className="video">
//             {callAccepted && !callEnded ?
//               <div>
//                 <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
//                 <Button variant="contained" color="secondary" onClick={leaveCall}>
//                   End Call
//                 </Button>
//               </div>
//               :
//               null}
//           </div>
//         </div>
//         <div className="myId">
//           <TextField
//             id="filled-basic"
//             label="Name"
//             variant="filled"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ marginBottom: "20px" }}
//           />
//           <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
//             <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
//               Copy ID
//             </Button>
//           </CopyToClipboard>

//           <TextField
//             id="filled-basic"
//             label="ID to call"
//             variant="filled"
//             value={idToCall}
//             onChange={(e) => setIdToCall(e.target.value)}
//           />
//           <div className="call-button">
//             {callAccepted && !callEnded ? (
//               <Button variant="contained" color="secondary" onClick={leaveCall}>
//                 End Call
//               </Button>
//             )
//               :
//               (
//                 <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
//                   <PhoneIcon fontSize="large" />
//                 </IconButton>
//               )
//             }
//             {idToCall}
//             {/* {name} */}
//           </div>


//           <div>
//             {receivingCall && !callAccepted ? (
//               <div className="caller">
//                 {console.log({ name }, "Name reached heree")}

//                 <h4 style={{ color: 'black' }} >{name} is calling</h4>
//                 <Button variant="contained" color="primary" onClick={answerCall}>
//                   Answer
//                 </Button>
//               </div>
//             ) : null}
//           </div>




//         </div>

//       </div>


//     </div>
//   )
// }

// export default VideoCall



// //css codeeeeeeeeeeeee

// .container {
// 	display: grid;
// 	grid-template-columns: 7fr 3fr;
// }

// .myId {
// 	margin-right: 5rem;
// 	border-radius: 5px;
// 	background: #c9d6ff; /* fallback for old browsers */
// 	background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff); /* Chrome 10-25, Safari 5.1-6 */
// 	background: linear-gradient(
// 		to right,
// 		#e2e2e2,
// 		#c9d6ff
// 	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// 	padding: 2rem;
// 	display: grid;
// 	justify-content: center;
// 	align-content: center;
// }

// .call-button {
// 	text-align: center;
// 	margin-top: 2rem;
// }

// .video-container {
// 	display: grid;
// 	grid-template-columns: 1fr 1fr;
// 	justify-content: center;
// 	align-content: center;
// 	margin-top: 10rem;
// 	margin-left: 10rem;
// }

// .caller {
// 	text-align: center;
// 	color: #fff;
// }

// .maindiv{
//     background: #4776e6; /* fallback for old browsers */
// 	background: -webkit-linear-gradient(to right, #8e54e9, #4776e6); /* Chrome 10-25, Safari 5.1-6 */
// 	background: linear-gradient(
// 		to right,
// 		#8e54e9,
// 		#4776e6
// 	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

// }