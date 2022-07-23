import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import './global.css'
// import SearchBox from '../components/SearchBox';
import Grid from '@mui/material/Grid';
import Skill from '../components/Skill';
import SkillModal from '../components/SkillModal'
import SearchBar from '../components/SearchBar'
import { getToken } from '../services/LocalStorageService';
import { useAddSkillsMutation } from '../services/userAuthApi';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetSkillsListQuery } from '../services/userAuthApi';

const SkillsPage = ({uId,userData}) => {
  const navigate = useNavigate()
  const token = getToken('token');
   const [open, setOpen] = React.useState(false);
   const [addskill,{isLoading}] = useAddSkillsMutation();
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [skillLinkText,setSkillLinkText]  = useState()
  async function handleAddingSkills(e,st,r) {
      const skillData = {title:st,rating:r}
      const res =  await addskill({uId,token,skillData})
      console.log(res)
      handleClose()
      navigate('/skills')
      window.location.reload()
   }

   function searchAddClicked(e) {
      handleOpen()
   }
   function skillsLinksClicked(e,txt) {
     setSkillLinkText(txt)
     handleOpen()
   }
   

  return (
    <div className={'container skillPageContainer darkenLayer'}>
      <div className="skillPageHeader d-flex">
       <SearchBar  placeholder="Enter a Skill..." data={skillsList} searchAddClicked={searchAddClicked} skillsLinksClicked={skillsLinksClicked} />
        {/* <SearchBox searchActive={searchActive} onFocusedOut={onFocusedOut} onFocused={onFocused} handleOpen={handleOpen}/> */}
        <SkillModal handleAddingSkills={handleAddingSkills} skillLinkText={skillLinkText} BtnIcon={AddIcon} handleOpen={handleOpen} handleClose={handleClose} open={open} />
      </div>

      <div className="skillPageBody">
      <Grid id="skillsGrid" container spacing={2}>
          {
            userData.map((e,i)=>{
              return(
              <Grid key={i} item xs={12} md={6}>
                  <Skill skillT={e.title} rates={e.rating}/>
              </Grid>
              );
            })
          }
      </Grid>
      </div>
    </div>
  )
}

export default SkillsPage

const skillsList =[
  'c++','c','python','java','django','laravel','react','node','express','mongodb','mongoose'
]