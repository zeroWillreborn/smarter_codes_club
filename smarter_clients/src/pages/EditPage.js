import React, { useState } from 'react'
import ProfilePageInputs from '../components/ProfilePageInputs'
import { useGetLoggedUserQuery, useUpdateUserMutation } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import './global.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Input({title,type,handleEdit}) {
   return( <div className={title==='About Me' ? `ppinput textBox` : 'ppinput'}>
   <h4 className='ppinputtitle'>{title}</h4>
    <input onChange={(e)=>handleEdit(e)} type={type} name={type} id={title} />
   </div>)

}

const EditPage = ({uId}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(null)
    const [bio, setBio] = useState("")
    const token = getToken('token')  
    const [update, {} ] = useUpdateUserMutation()
    const navigate = useNavigate();


    async function handleUpdate(e) {
        const newData = {name:name,email:email,phone:phone,bio:bio}
        await update({uId,token,newData})
        navigate('/profile')
        window.location.reload()
        
    }
    function handleEdit(e) {
        switch (e.target.id) {
            case 'Name':
                setName(e.target.value);
                break;
            case 'Email address':
                setEmail(e.target.value);
                break;
            case 'Phone':
                setPhone(e.target.value);
                break;
            case 'About me':
                setBio(e.target.value);
                break;
        }
    }
  return (
    <div className='edit'>
        <Input title={'Name'} type={'text'} handleEdit={handleEdit}/>
        <Input title={'Email address'} type={'email'} handleEdit={handleEdit}/>
        <Input title={'Phone'} type={'number'} handleEdit={handleEdit}/>
        <Input title={'About me'} type={'text'} handleEdit={handleEdit}/>
        <Button onClick={(e)=>handleUpdate(e)} style={{marginLeft:'-40px'}}>Submit</Button>
    </div>
  )
}

export default EditPage