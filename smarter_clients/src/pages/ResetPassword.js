import React, { useState } from 'react'
import AuthButton from '../components/AuthButton'
import Input from '../components/Input'
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../services/userAuthApi";

const ResetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [resetPassword, { }] = useResetPasswordMutation()
  const { id, token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    }
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await resetPassword({ actualData, id, token })
        console.log(res)
        if (res.data.status === "success") {
          document.getElementById('password-reset-form').reset()
          setError({ status: true, msg: "Password Reset Successfully. Redirecting to Login Page...", type: 'success' })
          setTimeout(() => {
            navigate("/login")
          }, 3000)
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
      <h1 className='t-center'>Forgot Password</h1>

      <aside className='signUpBody d-flex'>
        <p>No worries, we'll send you reset instructions.</p>
        <Input Icon ={EmailIcon} textHead="Email address" type={"email"} placeH={"Enter your Email address here"}/>
        <AuthButton btntext={"Send"}/>
      </aside>

    </div>
  )
}

export default ResetPassword