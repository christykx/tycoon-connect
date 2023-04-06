import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

import './Signup.css';
import { useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import Axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Signup() {

    const [show, setShow] = useState(false);
    // const [otp, setotp] = useState('');
    // const [orgotp, setorgotp] = useState('');
    const [userid, setuserid] = useState('');


    // const handleotpChange = (e) => {
    //     let val = e.target.value
    //     console.log(val, "VALLLLLLLLLLLLLLLLLLLLLLLLLLL");
    //     // setstate(otp)
    // };
    // console.log(orgotp, "ORIGINAL OTP ");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleverify = () => {
    //     // console.log("MY OTPPPPPPP", otp);
    //     // if (otp == orgotp) {
    //     console.log(userid, "IDDDDDD");
    //     Axios.post('http://localhost:3001/users/updateVerify', { userid }).then((response) => {
    //         console.log("VErifyy responseeeeeeeee");
    //         alert("Verified Successfully")
    //         handleClose()
    //         navigate('/login')
    //     }).catch((err) => {
    //         console.log(err);

    //     })
    //     // } else {
    //     //     alert("Invalid otp")
    //     // }

    // }

    const formLogin = () => {

        console.log("Callback function when Registration form is submitted!");
        console.log("Form Values ", values);

        Axios.post('http://localhost:3001/users/signup', {

            businessName: values.businessName,
            username: values.username,
            phone: values.phone,
            email: values.email,
            password: values.password,
            cpassword: values.cpassword

        }, {
            withCredentials: true,
        }).then((response) => {
            if (response.status) {

                console.log(response.data, "RESSSSSSSSSSSSPONNNNNNNSEEEEEEEEEEEEEEEEEE");
                console.log(response.data.userid);
                setuserid(response.data.userid)
                // setorgotp(response.data.OTP)

                // alert("success")

                // alert("Registration Completed Successfully")

                navigate('/login')

                // navigate('/otp')

            } else {

                console.log("erorr")
                // alert("Email already exist");
                // alert("Something went wrong")     
            }

        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err);

        })


    }


    // useEffect(() => {

    //     console.log(values, "##################");
    //     Axios.post('http://localhost:3001/users/signup', {

    //         businessName: values.businessName,
    //         username: values.username,
    //         phone: values.phone,
    //         email: values.email,
    //         password: values.password
    //     }, {
    //         withCredentials: true,
    //     }).then((response) => {
    //         if (response.status) {
    //             // alert("success")

    //             alert("Registration Completed Successfully")

    //             navigate('/login')
    //         } else {

    //             console.log("erorr")
    //             // alert("Email already exist");
    //             // alert("Something went wrong")     
    //         }

    //     }).catch((err) => {
    //         console.log(err);
    //         // alert(err.response.data)   
    //         console.log("-----errrrr---", err);

    //     })

    //     // navigate('/form')
    // }
    //     , [])


    const navigate = useNavigate()
    const { handleChange, values, errors, handleSubmit } = useForm(formLogin)

    return (
        <div className='signupbody'>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" name='name' placeholder="Name" />
                        <input type="email" name='email' placeholder="Email" />
                        <input type="password" name='password' placeholder="Password" />
                        <input type="password" name='cpassword' placeholder="Repeat Password" />

                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form method='post' onSubmit={handleSubmit}>
                        <span><img src='logo.jpg' style={{ width: '170px', height: '170px', marginTop: '-60px' }} /></span>

                        <h2 style={{ marginTop: '-30px' }}>SIGN UP</h2>
                        {/* <div class="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div> */}
                        {/* <span>or use your account</span> */}
                        {/* <input type="text" placeholder="Business Name" />
                        <input type="text" placeholder="User Name" />
                        <input type="number" placeholder="Phone Number" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                  

                        {/* <a href="#">Forgot your password?</a> */}
                        {/* <button>Register</button>
                        <br/>                         */}



                        <input type="text" minLength='5' required name="businessName" placeholder="Business Name" onChange={handleChange} />
                        {
                            errors.businessName && <p style={{ color: 'red', fontWeight: 'bolder' }}>{errors.businessName}</p>

                        }

                        <input type="text" minLength='5' required name="username" placeholder="username" onChange={handleChange} />
                        {
                            errors.username && <p style={{ color: 'red', fontWeight: 'bolder' }} >{errors.username}</p>

                        }

                        <input type="number" name="phone" placeholder="Phone number" onChange={handleChange} />
                        {
                            errors.phone && <p style={{ color: 'red', fontWeight: 'bolder' }}>{errors.phone}</p>
                        }

                        <input type="email" name="email" placeholder="E-mail" onChange={handleChange} />
                        {
                            errors.email && <p style={{ color: 'red', fontWeight: 'bolder' }}>{errors.email}</p>
                        }
                        <input minLength='8' type="password" name="password" placeholder="password" onChange={handleChange} />
                        {
                            errors.password && <p style={{ color: 'red', fontWeight: 'bolder' }}>{errors.password}</p>

                        }
                        <input minLength='8' type="password" name="cpassword" placeholder="Repeat Password" onChange={handleChange} />
                        {(values.password != values.cpassword) && <p style={{ color: 'red', fontWeight: 'bolder' }}>Password doesn't match</p>}

                        {/* {
                            errors.cpassword && <h6 style={{ color: 'red' }}>{errors.cpassword}</h6>

                        } */}


                        <input type="submit" style={{ backgroundColor: 'green', color: 'white' }}
                            // onClick={handleverify}
                            value="Register" className="submit" />

                        <span>Already have an account? <a onClick={() => { navigate('/login') }} style={{ color: 'blue', cursor: 'pointer' }}>Login</a></span>
                    </form>
                </div>
                <div className="overlay-container" >
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" >Sign Up</button>
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




            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Your OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                    />
                    {console.log(otp, "OTPPPPPPPPPPPPPPPPPPPPP")}

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleverify}>
                        Verify
                    </Button>
                </Modal.Footer>
            </Modal> */}

        </div>

    )
}

export default Signup
