import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ProfilePageInputs from './ProfilePageInputs';
import Rating from '../components/Rating'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  borderRadius:'16px',
  boxShadow: 24,
  width: '656px',
  height: '443px',
  p: 4,
background: '#FEFEFE'
};

export default function SkillModal({handleAddingSkills,BtnIcon,handleOpen,handleClose,open,skillLinkText}) {
  const [rates, setRates] = React.useState(0);
  const [skillT, setSkillT] = React.useState("");
  function onSkillInputChange(e) {
    setSkillT(e.target.value)
  }

  function handleRates(e) {
    setRates(e);
  }
  
  return (
    <div style={{'width':'280px','position':'fixed','top':'80px','right':'150px'}}>
      <Button variant='contained' startIcon={<AddIcon />} onClick={handleOpen}>Add a Skill</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ClearIcon onClick={(e)=>{handleClose(e)}} style={{'position':'absolute','right':'25px','cursor':'pointer'}}/>
         <div style={{'marginBottom':'80px'}}>
         <Typography style={{'marginBottom':'40px'}} id="modal-modal-title" variant="h5" component="h2">
            Add a New Skill
          </Typography>
          <ProfilePageInputs handleEdit={onSkillInputChange} title={'Skill'} type={'text'} value={skillLinkText}/>

          <Typography style={{'color':'#D83A52'}} id="modal-modal-title" variant="h6" component="h4">
            How would you rate yourself?
          </Typography>
          <Rating handleRates={handleRates} />
         </div>

          <Button onClick={(e)=>handleAddingSkills(e,skillLinkText ? skillLinkText : skillT ,rates)} style={{'marginLeft':'210px'}} variant="contained">Add a Skill</Button>
        </Box>
      </Modal>
    </div>
  );
}
