import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Project from '../components/Project';
import ClearIcon from '@mui/icons-material/Clear';
import ProfilePageInputs from '../components/ProfilePageInputs';
import { useAddProjectsMutation } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

function ProjectModel({uId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = getToken('token')
  const [addprojects, {}] = useAddProjectsMutation(token)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDesc, setProjectDesc] = useState("")
  const navigate = useNavigate()
  const [prSkills, setPrSkills] = useState("")
  const [error, setError] = useState(null)

  function handleProjectsInputs(e) {
    switch (e.target.id) {
      case 'Project Title':
        setProjectTitle(e.target.value)
        break;
      case 'Project Description':
        setProjectDesc(e.target.value)
        break;
      case 'Add Project Skills (Comma separated e.g A,B)':
        setPrSkills(e.target.value)
        break;
        }
  }
  async function addProjects(e) {
      let a = prSkills.split(',');
      const data = {projectT: projectTitle,projectDesc:projectDesc,projectSkills:a}
      const res = await addprojects({uId,token,data})
      setError(res.error.data) ; 
      if(error===null){
        navigate('/profile')
      }else{
        navigate('/projects')
        window.location.reload()
      }
  }
  return (
    <div>
      <Button variant="contained" style={{'backGroundColor':'#D83A52'}} startIcon={<AddIcon/>} onClick={handleOpen}>Add a Project</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ClearIcon onClick={(e)=>{handleClose(e)}} style={{'position':'absolute','right':'25px','cursor':'pointer'}}/>
          <Typography style={{'marginBottom':'20px'}} id="modal-modal-title" variant="h6" component="h2">
            Add a New Project
          </Typography>
          <ProfilePageInputs handleEdit={handleProjectsInputs} title={'Project Title'} type={'text'}/>
          <ProfilePageInputs handleEdit={handleProjectsInputs}  title={'Project Description'} type={'text'}/>
          <ProfilePageInputs handleEdit={handleProjectsInputs}  title={'Add Project Skills (Comma separated e.g A,B)'} type={'text'}/>
          {error !==null ? <Error errTxt={error} /> : ""}
          <Button onClick={(e)=>addProjects(e)} variant="contained" style={{'backGroundColor':'#D83A52'}}>Add a Project</Button>
        </Box>
      </Modal>
    </div>
  );
}

const ProjectsPage = ({uId,langData}) => {
  const [filteredData, setFilteredData] = useState(langData);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
  //  console.log(langData)
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = langData.filter((e) => {
      return e.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(langData)
    } else {
      setFilteredData(newFilter);
      // console.log(filteredData)
    }
  };

  return (
    <div className='projectsPage container'>
      <div className="head d-flex">
   
      <div className='searchBox'>
        <input value={wordEntered}
          onChange={handleFilter} type="text" name="search" id="skillSearchInput" placeholder='Search for projects' />
      </div>
    
   <ProjectModel uId={uId}/>
      </div>

      <div className="projectsPageBody">
      <Grid id="skillsGrid" container spacing={2}>
          {
            filteredData?.map((e,i)=>{
              // console.log(e)
              return(
                <Grid key={i} item xs={12} md={12}>
                  <Project title={e.title} desc={e.description} skills={e.projectSkills}/>
                </Grid>
              )
            })
          }
      </Grid>
      </div>
    </div>
  )
}

export default ProjectsPage






