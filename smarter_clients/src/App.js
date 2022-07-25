import React, { useEffect, useRef, useState } from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css'
import ResetPassword from './pages/ResetPassword'
import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import ProfilePage from './pages/ProfilePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportPage from './pages/ReportPage';
import Sidebar from './components/Sidebar';
import { useNavigate } from "react-router-dom";
import {getToken, removeToken } from './services/LocalStorageService';
import { useGetLoggedUserQuery } from './services/userAuthApi';
import { useDispatch} from "react-redux";
import { unsetUserToken } from './features/authSlice';
import { unsetUserInfo } from './features/userSlice';
import SendPasswordResetEmail from './pages/SendResetMail';
import EditPage from './pages/EditPage';
import { useReactToPrint } from 'react-to-print';

const App = React.forwardRef(
  () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [uId, setUId] = useState("")
    const token = getToken()
    const { data, isSuccess } =  useGetLoggedUserQuery(token);
    const [userData, setUserData] = useState({
      skiLLs:[],
      projects:[],
      name:"",
      email:"",
      phone:null,
      bio:""
    })
    const componentRef = React.createRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    async function onLogOut(e){
        dispatch(unsetUserToken({ token: null }))
        dispatch(unsetUserInfo({ name: "", email: "" }))
        removeToken('token')
        navigate('/')
    }
    useEffect(() => {
      if (isSuccess) {
        setUId(data.userId)
      };
    }, [data,uId,isSuccess])
  
    useEffect(() => {
      if (data && isSuccess) {
        setUserData({
          skiLLs:data.user.skills,
          projects:data.user.projects,
          name:data.user.name,
          email:data.user.email,
          phone:data.user.phone,
          bio:data.user.bio,
        })
      }
    }, [data,uId,isSuccess])
    
  
        return(
          <div className='app center-center'>
            <div>
              <Routes>
              <Route path={token ? '/signin' : '/'} element={token ? <Navigate to={'/profile'}/> : <SignIn/>}/>
          <Route path="/oauth2.0+signup" element={token ? <Navigate to={'/profile'}/> : <SignUp/>} />
          <Route path="/send-reset-password-email" element={token ? <Navigate to={'/profile'}/> : <SendPasswordResetEmail/>} />  
          <Route path="/reset-password/:id/:token" element={token ? <Navigate to={'/profile'}/> : <ResetPassword/>} />  
              </Routes>
            </div>
        <main id={token ? '': 'hidden'} className='appContainer'>
          <div className="leftAppContainer">
            <Sidebar onlogout={onLogOut}/>
          </div>
          <div className="rightAppContainer">
          <Routes>
          <Route path='/profile' element={token ? <ProfilePage/> : <SignIn/>}/>
          <Route path='/profile/edit' element={token ? <EditPage uId={uId}/> : <SignIn/>}/>
          <Route path="/skills" element={token ? <SkillsPage uId={uId} userData={userData.skiLLs}/> : <SignIn/>} />
          <Route path="/projects" element={token ? <ProjectsPage uId={uId} langData={userData.projects}/> : <SignIn/>} />
          <Route path="/report" element={token ? <ReportPage ref={componentRef} handlePrint={handlePrint} uId={uId}  userData={userData}/> : <SignIn/>} />
          <Route path="/*" element={<p>Welcome To Pluto! <Link to={'/profile'}>Click here to Land on Mars.</Link></p>}/>
          </Routes>
          </div>
        </main> 
        </div>
        )
      }
)
    
export default App;