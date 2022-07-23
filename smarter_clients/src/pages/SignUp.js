import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import ErrorIcon from '@mui/icons-material/Error';
import Input from '../components/Input';
import '../components/css/Auth.css'
import AuthButton from '../components/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import { useGetLoggedUserQuery, useRegisterUserMutation } from '../services/userAuthApi';
import { storeToken } from '../services/LocalStorageService';
import Error from '../components/Error';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate()
  function setUserLoginDetails(e) {
    if (e.target.name==='Email address') {
      setEmail(e.target.value)
    }else if(e.target.name==='Password'){
      setPass(e.target.value)
    }else{
      setCPass(e.target.value)
    }
  }

 async function onDataSubmit(e) {
    if (email && pass && cPass) {
      if (pass === cPass) {
        const res = await registerUser({email,pass,cPass})
        if (res.data.status === "success") {
          storeToken(res.data.token)
          navigate(`/`)
        }
        if (res.data.status === "failed") {
          setError({ status: true, msg: res.data.message, type: 'error' })
        }
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return (
    <div className='signup authBox'>
      <h1 className='t-center'>Sign Up</h1>

      <aside className='signUpBody d-flex'>
        <Input setUserLoginDetails={setUserLoginDetails} Icon ={EmailIcon} textHead="Email address" type={"email"} placeH={"Enter your Email address here"}/>
        <Input setUserLoginDetails={setUserLoginDetails} Icon ={KeyIcon} textHead="Password" type={"password"} placeH={"Enter your password here"}/>
        <Input setUserLoginDetails={setUserLoginDetails} Icon ={KeyIcon} textHead="Confirm Password" type={"password"} placeH={"Re-enter your password here"}/>
        {error.status ? <Error errText={error.msg}/> : ''}
        <AuthButton onDataSubmit={onDataSubmit} btntext={"Sign Up"}/>

        <article style={{"marginTop":"50px","color":"gray"}}>Already have an acoount yet? <Link style={{"color":"#D83A52"}} to="/">Sign In here</Link></article>
      </aside>

    </div>
  )
}

export default SignUp;