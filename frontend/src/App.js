import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './authContext/AuthContext';
import Post from './store/PostContext';
import PostInfo from './store/PostInfoContext';



import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Homepage from './Pages/Homepage';
import { useContext } from 'react';
import Create from './Pages/CreatePost';
import ProfilePage from './Pages/Profile';
import Otpscreen from './Pages/Otp';
import Demopage from './Pages/Demo';
import ViewUserPage from './Pages/ViewUser';
import Messages from './Components/Messages/Messages';
import MessagesPage from './Pages/Messages';
import AdminPage from './Pages/AdminLogin';
import AdminDashboardPage from './Pages/AdminDashboard';
import UserManagementPage from './Pages/UserManagement';
import { Report } from '@mui/icons-material';
import ReportManagementPage from './Pages/ReportManagement';
import VideoCallPage from './Pages/VideoCall';

import UploadWidget from './Components/UploadWidget';


function App(props) {

  const { currentUser } = useContext(AuthContext)
  const ProtectedRouter = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const ProtectedPage = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }


  return (
    <div className="App">
      <Post>

        {/* <PostInfo> */}

        <Router>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={
              < ProtectedPage>
                <Login />
              </ ProtectedPage>
            } />
            <Route exact path='/' element={
              <ProtectedRouter>
                <Homepage />
              </ProtectedRouter>
            } />
            <Route path='/create' element={<Create />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/viewuser' element={<ViewUserPage />} />
            <Route path='/chat' element={<MessagesPage/>} />
            <Route path='/videocall' element={<VideoCallPage/>} />


            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admindashboard' element={<AdminDashboardPage />} />
            <Route path='/usermanagement' element={<UserManagementPage />} />
            <Route path='/reportmanagement' element={<ReportManagementPage />} />

            <Route path='/upld' element={<UploadWidget />} />

            {/* <Route path='/otp' element={<Otpscreen/>} /> */}
            {/* <Route path='/demo' element={<Demopage/>}/> */}


          </Routes>
        </Router>


      {/* </PostInfo> */}
    </Post>

    </div >
  );
}

export default App;
