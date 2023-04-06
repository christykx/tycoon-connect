import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import axios from 'axios';




function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const [error, seterror] = useState({});
    const [issubmit, setissubmit] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault()
        seterror(validate(email, password));
        setissubmit(true)
        // const {name,phone,email,password}=user

    }



    useEffect(() => {
        console.log(error);
        if (Object.keys(error).length === 0 && issubmit) {
            // console.log(user);
            // axios.post('https://tycoonconnectapi.onrender.com/admin/adminlogin', {
            axios.post('http://localhost:3001/admin/adminlogin', {

                // name: user.name,
                // phone: user.phone,
                email: email,
                password: password
            }).then((response) => {
                if (response.status) {
                    // alert("success")
                    navigate('/admindashboard')
                }
                else {

                    alert("Something went wrong")
                }
            })

        }

    }, [error])



    const validate = (email, password) => {
        const errors = {}

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email) {
            errors.email = "Email id is required"
        } else if (!regex.test(email)) {
            errors.email = "This is not a valid email format"
        }
        if (!password) {
            errors.password = "Password is required"
        } else if (password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        }
        return errors;
    }



    return (
        <div className='loginbody'>
            <div className="container" id="container">
                
                <div class="form-container sign-in-container">
                    <form >
                        <span><img src='logo.jpg' style={{ width: '170px', height: '170px', marginTop: '-60px' }} /></span>

                        <h2 style={{ marginTop: '-30px' }}>ADMIN LOGIN</h2>
                   
                        <input type="email" name="email"  placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        
                        <p style={{ color: 'red' }}>{error.email}</p>


                        <input minLength='8' type="password"  name="password" placeholder="password"  value={password}  onChange={(e) => setPassword(e.target.value)} />
                       
                        <p style={{ color: 'red' }}>{error.password}</p>


                        <input onClick={handleLogin} type="submit" style={{ backgroundColor: 'green', color: 'white' }} value="Login" className="submit" />

                        <br />
                        {/* <span>Don't have an account? <a onClick={() => { navigate('/signup') }} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</a></span> */}
                    </form>
                </div>
                <div className="overlay-container" >
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign Up</button>
                        </div>
                      
                    </div>
                </div>


            </div>

            <br /><br />
        </div>

    );
}

export default AdminLogin
