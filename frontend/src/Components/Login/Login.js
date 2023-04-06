import React, { useContext, useEffect, useState } from 'react';
import './Login.css';


import { useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import { AuthContext } from '../../authContext/AuthContext';
// import Axios from 'axios'
// import { AuthContext } from '../../authContext/AuthContext';
import axios from 'axios';


function Login() {

    //Final submit function


        const { currentUser } = useContext(AuthContext)


    const { login } = useContext(AuthContext)
    const [blockdata, setblockdata] = useState('');


    const formLogin = () => {

        console.log("Callback function when form is submitted!");
        console.log("Form Values ", values);


        console.log(values, "VALUES REACHED");
        const details = {
            email: values.email,
            password: values.password,

        }

        // axios.get(`http://localhost:3001/users/getblockdetails/${details.email}`).then((response) => {

        //     // console.log(response, "Get user block details");
        //     // if (response.status) {
        //     if (response.data.status) {
        //         alert("Admin blocked you")
        //         return
        //     }
        //     // console.log(response?.data, "Get block dataaaaaaa");
        //     // setblockdata(response?.data)

        //     // }
        //     // else {
        //     //     alert("Something went wrong")
        //     // }
        // }).catch((err) => {
        //     console.log(err);
        //     alert(err.response.data)
        //     console.log("-----errrrr---", err.response.data);

        // })




        login(details).then((response) => {

            console.log("detailssssss", details);

            console.log(response, "KItti poiiiiiiiiiiiiiiii");
            console.log(response.userid, "KItti poiiiiiiiiiiiiiiii");

            console.log("KItti poiiiiiiiiiiiiiiii");

         
            // console.log("detailssssss",details._id);

            let id = response.userid
            axios.get(`http://localhost:3001/users/login/${id}`).then((res) => {

                console.log("Login details", res.data);

                navigate("/")
              
            }, { withCredentials: true })

        }).catch((err) => {
            console.log("Hoiiiiiiiiiiii");
            console.log("-----login errrrr message---", err);
            alert("You can't login.. Admin Blocked You")
        })

    }


    const navigate = useNavigate()
    const { handleChange, values, errors, handleSubmit } = useForm(formLogin)



    return (
        <div className='loginbody'>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form >
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form method='post' onSubmit={handleSubmit}>
                        <span><img src='logo.jpg' style={{ width: '170px', height: '170px', marginTop: '-60px' }} /></span>

                        <h2 style={{ marginTop: '-30px' }}>LOGIN</h2>




                        <input type="email" name="email" placeholder="E-mail" onChange={handleChange} />
                        {
                            errors.email && <p style={{ color: 'red', fontWeight: 'bolder' }}>{errors.email}</p>
                        }
                        <input minLength='8' type="password" name="password" placeholder="password" onChange={handleChange} />
                        {
                            errors.password && <p style={{ color: 'red', fontWeight: 'bolder' }}>Password required</p>

                        }
                        {/* <input type="text" minLength='5' required name="username" placeholder="username" onChange={handleChange} />
                        {
                            errors.username && <h3>{errors.username}</h3>

                        } */}
                        <input type="submit" style={{ backgroundColor: 'green', color: 'white' }} value="Login" className="submit" />



                        <br />
                        <span>Don't have an account? <a onClick={() => { navigate('/signup') }} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</a></span>
                    </form>
                </div>
                <div className="overlay-container" >
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign Up</button>
                        </div>
                        {/* <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
        </div> */}
                    </div>
                </div>


            </div>

            <br /><br />
        </div>

    );
}


export default Login
