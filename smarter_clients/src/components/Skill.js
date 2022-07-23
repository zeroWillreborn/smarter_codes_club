import React from 'react'
import Rating from '@mui/material/Rating';
const Skill = ({skillT,rates}) => {
   
  return (
    <div className='skillContainer'>
        <span className="skillTitle">{skillT}</span>
        <span className="rating">
        <Rating name="read-only" value={rates} readOnly />
        </span>
    </div>
  )
}

export default Skill