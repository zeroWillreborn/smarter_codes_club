import { useState } from 'react';
import AuthButton from '../components/AuthButton';
import Input from '../components/Input';
import { useSendPasswordResetEmailMutation } from "../services/userAuthApi";
import EmailIcon from '@mui/icons-material/Email';
import './global.css'
import Error from '../components/Error';

const SendPasswordResetEmail = () => {
  const [resetEmail, setResetEmail] = useState("")
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()
  const handleSubmit = async (e) => {
    const data = {
      email: resetEmail
    }
    if (data.email) {
      const res = await sendPasswordResetEmail(data)
      if (res.data.status === "success") {
        console.log('Check your mail')
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
        console.log(error.msg);
      }
    } else {
      setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
    }
  }

  function storeEmail(e) {
    setResetEmail(e.target.value);
  }
  return <>
    <div className='signup authBox'>
      <h1 className='t-center'>Forgot Password</h1>

      <aside className='signUpBody d-flex'>
        <p>No worries, we'll send you reset instructions.</p>
        <Input setUserLoginDetails={storeEmail} Icon ={EmailIcon} textHead="Email address" type={"email"} placeH={"Enter your Email address here"} />
        {error.type==='error' ? <Error errText={error.msg}/> : ''}
        <AuthButton onDataSubmit={handleSubmit} btntext={"Send"}/>
      </aside>

    </div>
  </>;
};

export default SendPasswordResetEmail;
