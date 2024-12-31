import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
import style from './Register.module.css';
import { userRegister } from '../../../services';
import { toast } from 'react-toastify';
import logo from '../../assets/google.png';
import Polygon1 from '../../assets/Polygon1.png';
import Polygon2 from '../../assets/Polygon2.png';

const Register = () => {
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    const handleRegister = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value })
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (registerForm.password !== registerForm.confirmpassword) {
            toast.error("Passwords do not match!");
            return; // Stop further execution if they don't match
        }

        try {
            const res = await userRegister(registerForm);
            if (res.status === 200) {
                const data = await res.json();
                setRegisterForm({
                    username: '',
                    email: '',
                    password: '',
                    confirmpassword: ''

                })
                toast.success("User Registered Successfully");
                navigate('/login');
            }
            else{
                console.log(res)
                toast.error("User Registration Failed");
            }

        } catch (error) {
            console.log(error);
        }

        // try {
        //     const res = await axios.post('http://localhost:4000/api/user/register', { registerForm } );
        //     localStorage.setItem('token', res.data.token);
        //     navigate('/login');
        //   } catch (err) {
        //     console.log(err.response.data.msg || 'Server Error');
        //   }

    }
    return (
        <>
            <div className={style.register}>
                <div className={style.leftArrow}>
                    <Link to={'/'}><i className="fa-solid fa-arrow-left"></i></Link>
                </div>

                <div className={style.triangle1}><img src={Polygon1} alt="tri1" /></div>
                <div className={style.triangle2}><img src={Polygon2} alt="tri2" /></div>
                <div className={style.semiCircle1}></div>


                <form onSubmit={handleRegisterSubmit} className={style.registerForm}>
                    <div className={style.registerInput}>
                        <label >UserName:</label><br />
                        <input type="text"
                            id="username"
                            value={registerForm.username}
                            onChange={handleRegister}
                            name="username"
                            placeholder='Enter Username' required

                        />
                    </div>
                    <div className={style.registerInput}>
                        <label >Email:</label><br />
                        <input type="email"
                            id="email"
                            value={registerForm.email}
                            onChange={handleRegister}
                            name="email"
                            placeholder='Enter Email' required

                        />
                    </div>
                    <div className={style.registerInput}>
                        <label >Password:</label><br />
                        <input type="password"
                            id="password"
                            value={registerForm.password}
                            onChange={handleRegister}
                            name="password"
                            placeholder='Enter Password' required

                        />
                    </div>
                    {registerForm.password !== registerForm.confirmpassword ? 
                    (<div className={style.Error}>
                        <label >Confirm Password:</label><br />
                        <input type="password"
                            id="confirmpassword"
                            value={registerForm.registerInput}
                            onChange={handleRegister}
                            name="confirmpassword"
                            placeholder='Enter Confirm Password' required
                        />
                        
                        <p >Password does not match</p>
                    
                    </div>):
                    ( <div className={style.registerInput}>
                        <label >Confirm Password:</label><br />
                        <input type="password"
                            id="confirmpassword"
                            value={registerForm.registerInput}
                            onChange={handleRegister}
                            name="confirmpassword"
                            placeholder='Enter Confirm Password' required

                        />
                        <div style={{height:'30px'}}></div>
                    </div>)
                    }
                   

                    <button type='submit'>Sign Up</button>
                </form>
                <div className={style.google}>
                    <p>OR</p>
                    <button><img src={logo} alt="google" />Sign Up with Google</button>
                </div>

                <div className={style.already}>
                    <p>Already have an account ? <Link to={'/login'} >Login</Link></p>
                </div>
                <div className={style.semiCircle2}></div>
            </div>
        </>
    )
}

export default Register;
