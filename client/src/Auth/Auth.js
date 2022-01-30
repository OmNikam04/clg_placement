import React,{ useState } from "react";
import "./auth.css";
import { GoogleLogin } from 'react-google-login'
import Input from './Input'
import {GoogleIcon, LabelIcon, PasswordIcon, EmailIcon, CPasswordIcon } from './icon'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { studentSignup } from '../actions/auth'

const initialState = { name: '', email: '', password: '', cpassword:''}

const Auth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(isSignup){
      dispatch(studentSignup(formData, navigate))
    }
  }

  const switchMode = ()=>{
    setIsSignup((prevIsSignup)=> !prevIsSignup)
  }
  const googleSuccess = async (res)=>{// when we successfully log in we get a full response object
    // console.log(res)
    const result = res?.profileObj
    const token = res?.tokenId

    try {
        dispatch({ type: 'AUTH', data: { result, token } })
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}
const googleFailure = ()=>{
    console.log('Google Sign in was unsuccessful. Try again later');
}

  return (
    <>
      <div className="content">
        <form className="login-form" onSubmit={handleSubmit}>
          {
            !isSignup?
            <h2 className="form-heading">Log In</h2>:
            <h2 className="form-heading">Register</h2>
          }
          {
            isSignup && (
              <Input name='name' label={<LabelIcon/>} type="text" handleChange={handleChange} placeholder='Name'/>
            )
          }
          <Input name='email' label={<EmailIcon/>} type="email" handleChange={handleChange} placeholder='Email'/>
          <Input name='password' label={<PasswordIcon/>} type="password" handleChange={handleChange} placeholder='Password'/>
          {
            isSignup && (
              <Input name='cpassword' label={<CPasswordIcon/>} type="text" handleChange={handleChange} placeholder='Confirm password'/>
            )
          }
          <button className="lf--submit" type="submit">{isSignup? 'Sign Up': 'Sign in'}</button>
          <GoogleLogin
                    clientId="44814833111-buampdfi6i2memfhjd0r24ek7ahpdlr4.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <div className="action">
                            <button onClick={renderProps.onClick} className="login-with-google-btn" disabled={renderProps.disabled} > <GoogleIcon/> Google Sign In</button>
                        </div>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
           />
        </form>
        <a className="registerLink" onClick={switchMode}>
          { isSignup?<div> Already have an account?<span className="lf--forgot"> Sign In</span></div> : <div> Don't have account<span className="lf--forgot"> Sign Up</span></div>}
        </a>
      </div>
    </>
  );
};

export default Auth;
