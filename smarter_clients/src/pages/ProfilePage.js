import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from "react-router-dom";
import ProfilePageInputs from '../components/ProfilePageInputs';
import './global.css'
import { getToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
const ProfilePage = () => {
  // const navigate = useNavigate()
  const token = getToken()
  const navigate = useNavigate()
  const { data, isSuccess } = useGetLoggedUserQuery(token)
  const [userData, setUserData] = useState({
    name:"Smart_Coder",
    email: "",
    phone: "",
    bio:"",
    userId:""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        bio: data.user.bio,
        userId: data.user._id
      })
    }
  }, [data, isSuccess])

  // // Store User Data in Redux Store
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (data && isSuccess) {
  //     dispatch(setUserInfo({
  //       name: data.user.name,
  //       email: data.user.email,
  //       phone: data.user.phone,
  //       bio: data.user.bio
  //     }))
  //   }
  // }, [data, isSuccess, dispatch])
  return (
    <>
    <div className='profilePage'>
      <header className='profilePageHeader'>
        <div className="headerLeft">
        <span className="avatar">{userData.name === "Smart_Coder" ? userData.name[0] : 'Smart'}</span>
        <span className="nameaddr"><h1>{userData.name}</h1><h5>Anywhere,India</h5></span>
        </div>
        <div className="headerRight">
        <EditIcon onClick={(e)=>navigate('/profile/edit')} />
        </div>
      </header>

      <aside className="ProfilePageinfoBox">
        <ProfilePageInputs title={"Email address"} type={"email"} readonly value={userData.email}/>
        <ProfilePageInputs title={"Contact"} type={"number"} readonly value={userData.phone}/>
        <ProfilePageInputs title={"About Me"} type={"text"} readonly value={userData.bio}/>
      </aside>
    </div>
    </>
  )
}

export default ProfilePage