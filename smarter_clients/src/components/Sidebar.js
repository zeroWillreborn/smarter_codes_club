import React, { useEffect, useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarLink from './SidebarLink';
import './css/Sidebar.css'
import { useNavigate } from "react-router-dom";
const Sidebar = ({onlogout}) => {
    const [profileAS, setProfile] = useState(true);
    const [skillsAS, setSkills] = useState(false)
    const [projectsAS, setProjects] = useState(false)
    const [reportAS, setReport] = useState(false)
    const navigate = useNavigate();
    function setActiveStatus(p,s,pr,r) {
        setProfile(p);
        setSkills(s);
        setProjects(pr);
        setReport(r);
    }
    function handleLinkActiveStates(e) {
        switch (e.target.innerText) {
          case 'My Profile':
            setActiveStatus(true,false,false,false);
            break;
          case 'My Skills':
            setActiveStatus(false,true,false,false);
            break;
          case 'My Projects':
            setActiveStatus(false,false,true,false);
            break;
          case 'My Report':        
            setActiveStatus(false,false,false,true);
            break;
          default:
            setActiveStatus(true,false,false,false);
          break;
        }
    }
function handlePath(e) {
  
}
    useEffect(() => {
     const res =  handlePath(window.location.pathname);
    }, [])
    
  return (
    <div className='sidebar'>
        <div className="upSideBar">
            <SidebarLink path="/profile" handleLinkActiveStates={handleLinkActiveStates} active={profileAS} title={"My Profile"} Icon={AccountCircleOutlinedIcon}/>
            <SidebarLink path="/skills" handleLinkActiveStates={handleLinkActiveStates} active={skillsAS} title={"My Skills"} Icon={LeaderboardIcon}/>
            <SidebarLink path="/projects" handleLinkActiveStates={handleLinkActiveStates}  active={projectsAS} title={"My Projects"} Icon={FactCheckIcon}/>
            <SidebarLink path="/report" handleLinkActiveStates={handleLinkActiveStates}  active={reportAS} title={"My Report"} Icon={SummarizeIcon}/>
        </div>

        <div className="downSideBar">
            <div className='signoutBtn' onClick={(e)=>onlogout(e)}>
                <span className="circle sideBarIconBox">
                    <LogoutIcon/>
                </span>
                <span className="signOutBtnText">
                    Sign Out
                </span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar