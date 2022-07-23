import { Button, Grid } from '@mui/material';
import React from 'react'
import Project from "../components/Project";
import Skill from '../components/Skill';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Avatar from '../components/Avatar'
import ProfilePageInputs from '../components/ProfilePageInputs';
import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";

const Header = ({handlePrint}) => {
  return (
    <div className='reportHeader'>
      <div className="left">My Report</div>
      <div className="right">
      <Button variant="contained" style={{'backGroundColor':'#D83A52','marginLeft':'20px'}} startIcon={<ShareIcon/>} >Share Report</Button>
      <Button onClick={(e)=>{handlePrint()}} variant="contained" style={{'backGroundColor':'#D83A52','marginLeft':'20px'}} startIcon={<FileDownloadIcon/>} >Download Report </Button>
      </div>
    </div>
  )
}
const SubHeader = ({num,name,email}) => {
  return (
    <div className='subReportHeader'>
    <Avatar name={name} />
      
      <div className="emailandphone">
        <span className="email">{email}</span>
        <span className="phone">{num}</span>
      </div>
    </div>
  )
}
const AboutSection = () => {
  return (
    <div className='aboutSection'>
      <ProfilePageInputs readonly title={'About Me'} type={'text'} value={'Im a developer'}/>
    </div>
  )
}

const ReportPage = React.forwardRef(({uId,userData,handlePrint},ref) => {
  const {skiLLs,projects,name,phone,bio,email} = userData
  return (
    <div ref={ref} className='reportPage container'>
        <section className="reportSection">
          <Header handlePrint={handlePrint}/>
          <SubHeader num={phone} name={name} email={email}/>
          <AboutSection/>
        </section>
        <section className="skillsSection">
          <div className='left'>Skills</div>
          <Grid id="skillsGrid" container spacing={2}>
          {
            skiLLs?.map((e,i)=>{
              return(
                <Grid key={i} item xs={12} md={6}>
                  <Skill skillT={e.title} rates={e.rating}/>
                </Grid>
              )
            })
          }
      </Grid>
        </section>
        <section className="projectsSection">
        <div className='left'>Projects</div>
          <div className="projects">
            {
              projects.map((e,i)=>{
                console.log(e)
                return(
                  <>
                  <Project title={e.title} desc={e.description} skills={e.projectSkills} />
                  </>
                )
              })
            }
          </div>
        </section>
    </div>
  )
})

export default ReportPage