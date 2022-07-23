import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
// import ErrorIcon from '@mui/icons-material/Error';
import Input from '../components/Input';
import AuthButton from '../components/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/userAuthApi';
import { storeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../features/authSlice';
import Error from '../components/Error';
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loginUser] = useLoginUserMutation()

  function setUserLoginDetails(e) {
    if (e.target.type==='email') {
      setEmail(e.target.value)
    }else{
      setPass(e.target.value)
    }
  }
  
  async function onDataSubmit(e) {
    if (email && pass) {
      const res = await loginUser({email,pass})
      console.log(res)
      if (res.data.status === "success") {
        storeToken(res.data.token)
        dispatch(setUserToken({ token: res.data.token}))
        navigate(`/`)
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return (
    <div className='signup authBox'>
      <h1 className='t-center'>Sign In</h1>

      <aside className='signUpBody d-flex'>
        <Input setUserLoginDetails={setUserLoginDetails}Icon ={EmailIcon} textHead="Email address" type={"email"} placeH={"Enter your Email address here"}/>
        <Input  setUserLoginDetails={setUserLoginDetails} Icon ={KeyIcon} textHead="Password" type={"password"} placeH={"Enter your password here"}/>
        {error.status ? <Error errText={error.msg}/> : ''}
        <Link className='forgotPassLink' to="/send-reset-password-email">Forgot password?</Link>
        <AuthButton onDataSubmit={onDataSubmit} btntext={"Sign In"}/>
        <article style={{"marginTop":"50px","color":"gray"}}>Don't have an acoount yet? <Link style={{"color":"#D83A52"}} to="/oauth2.0+signup">Sign Up here</Link></article>
      </aside>

    </div>
  )
}

export default SignIn