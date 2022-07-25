import React, { useState } from 'react'
import AuthButton from '../components/AuthButton'
import KeyIcon from '@mui/icons-material/Key';
import Input from '../components/Input'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../services/userAuthApi";

const ResetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [newpass, setNewpass] = useState("")
  const [cNewPass, setCNewPass] = useState("")
  const [resetPassword, { }] = useResetPasswordMutation()
  const { id, token } = useParams()

  const handleSubmit = async (e) => {
    const actualData = {
      password: newpass,
      password_confirmation: cNewPass,
    }
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await resetPassword({ actualData, id, token })
        console.log(res)
        if (res.data.status === "success") {
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
      <h1 className='t-center'>Reset Password - Smart_Coders</h1>

      <aside className='signUpBody d-flex'>
        <p>Reset</p>
        <Input Icon ={KeyIcon} textHead="New Password" type={"password"} placeH={"Enter new password here"}/>
        <Input Icon ={KeyIcon} textHead="Confirm Password" type={"password"} placeH={"Re-enter new password here"}/>
        <AuthButton btntext={"Change password"}/>
      </aside>

    </div>
  )
}

export default ResetPassword