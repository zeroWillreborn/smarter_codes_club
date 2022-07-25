import React from 'react'
import SkillBatch from './SkillBatch'

const Project = ({title,desc,skills}) => {
  return (
    <>
     <div className="projectContainer">
      <h3 className="projectTitle">{title}</h3>
      <p className="projectDescription">{desc}</p>
      <div className="projectSkills">
      {
        skills ? skills.map((e,i)=>{
          return(
            <SkillBatch key={i} title={e}/>
          )
        }) : "You don't have skills yet."
      }
      </div>
      </div> 
    </>
  )
}

export default Project